const mqtt = require('mqtt');
const { database } = require('./sqlite.js');
// const { database } = require('./database.js');
require('dotenv').config()

options = {
    clientId: "mqttjs01",
    clean: true
};

exports.mqttClient = {
    client: null,
    connect: () => { 
        const client = mqtt.connect(process.env.MQTT_HOST, options);

        client.on("connect",() => console.log("Connected to MQTT"));
        client.on('message', function (topic, message, packet) {
            console.log("topic is " + topic);
            let data = JSON.parse(message)
            if (topic == tempTopic) {
                const {temp, codAquario} = data;
                console.log(`Temperature: ${temp}°C  Aquarium: ${codAquario}`);
                database.insertTemp(temp, codAquario)
            } else if (topic == foodTopic) {
                let codAquario = Number(message)
                console.log(`Feeding aquarium ${codAquario}`)
                database.updateLastFood(codAquario);
            }
        });
        client.on("error", function (error) {
            console.log("Can't connect" + error);
            process.exit(1)
        });
        const tempTopic = process.env.TOPIC_TEMP
        const foodTopic = process.env.TOPIC_FOOD

        client.subscribe(tempTopic, { qos: 1 });
        client.subscribe(foodTopic, { qos: 1 });
        this.mqttClient.client = client;
    }
}


