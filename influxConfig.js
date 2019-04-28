const Influx = require('influx');
module.exports = {
    host: 'localhost',
    database: 'telegraf',
    protocol: 'http',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 8086,
    schema: [{
        measurement: 'cpu_temp',
        fields: {
            temperature: Influx.FieldType.FLOAT,
        },
        tags: ["temperature"]
    }]
};
