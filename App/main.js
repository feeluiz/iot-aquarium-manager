const cron = require("node-cron");
const { database } = require('./sqlite.js');
const { mqttClient } = require('./mqtt.js');
require('dotenv').config()


async function create_schedules() {
    const aquarios = await database.search("SELECT COD_AQUARIO, PERIODO FROM AQUARIO");
    contador = 1;
    cron.schedule(`1 * * * *`, () => {
        aquarios.forEach(aquario => {
            if(contador % aquario.PERIODO === 0 && (contador > 1 || contador === aquario.PERIODO) ){
                mqttClient.client.publish('kjk/food', `${aquario.COD_AQUARIO}`, { qos: 0 }, err => {});
            }
        });
        contador++;
    });
}

/* Scheduled tasks each 20 minutes as background task*/ 
//cron.schedule("* * * * *", () => database.printAllFood())
mqttClient.connect();
mqttClient.client.on("connect", err => {
    if (err) console.error(err.message);
    else console.log("Connected to database");
    create_schedules();
});


//#endregion MQTT