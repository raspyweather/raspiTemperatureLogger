const Influx = require('influx');
module.exports = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    protocol: 'http',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 8086,
    schema: [{
        measurement: 'temperatures',
        fields: {
            temperature: Influx.FieldType.FLOAT
        },
        tags: ["name"]
    }]
};
