
const util = require('util');
const readFile = util.promisify(require('fs').readFile);
const cron = require('cron');

const Influx = require('influx');
const influxConfig = require('./influxConfig');
const influxTransform = require('./influxDataTransform').transformForInflux;

const influx = new Influx.InfluxDB(influxConfig);
const measurementName = influxConfig.schema[0].measurement;

const readTemp = () => readFile('/sys/class/thermal/thermal_zone0/temp').then(dat => parseFloat(dat.toString()) / 1000);

function doMeasurement() {
    try {
        readTemp().then(temp => influxTransform(temp, measurementName))
            .then(data =>
                influx.writePoints([data])
                    .then(() => { })
                    .catch(err => console.error(err)));
    } catch (err) {
        console.error(err);
    }
}

const cronjob = new cron.CronJob('* * * * *', doMeasurement, null, true, 'Europe/Berlin');
cronjob.start();