const mqtt = require('mqtt');
const cron = require("node-cron");
const { database } = require('./sqlite.js');// require('./database.js');
require('dotenv').config()

options = {
    clientId: process.env.MQTT_CLIENT_ID,
    clean: true
};

exports.mqttClient = {
    client: null,
    connect: () => {
        const client = mqtt.connect(process.env.MQTT_HOST, options);
        client.on("connect", () => {
            console.log(`Connected to MQTT: ${client.connected}`)
            this.mqttClient.create_schedules();
        });
        client.on('message', function (topic, message, packet) {
            console.log("topic is " + topic);
            let data = JSON.parse(message)
            if (topic == tempTopic) {
                const { temp, codAquario } = data;
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
    },
    publish: (topic, message) => {
        console.log(`${topic}: ${message}`);
        this.mqttClient.client.subscribe(topic, (err) => {
            if (!err) this.mqttClient.client.publish(topic, `${message}`);
        });
    },
    create_schedules: () => {
        database.search("SELECT COD_AQUARIO, PERIODO FROM AQUARIO").then(async (aquarios) => {
            if (this.mqttClient.client.connected) {
                console.log("Creating Schedules");
                cron.schedule("* * * * *", _ => {
                    const minute = new Date().getMinutes();
                    aquarios.forEach(aquario => {
                        if (minute % aquario.PERIODO === 0 && (minute > 1 || minute === aquario.PERIODO)) {
                            this.mqttClient.publish('kjk/food', aquario.COD_AQUARIO);
                        }
                    });
                });
            }
        });
    }
}