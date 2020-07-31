const util = require('util');
const readFile = util.promisify(require('fs').readFile);
const readdir = util.promisify(require('fs').readdir);


const cron = require('cron');

const Influx = require('influx');

const influxConfig = require('./influxConfig');
const influxTransform = require('./influxDataTransform').transformForInflux;

const influx = new Influx.InfluxDB(influxConfig);
const measurementName = influxConfig.schema[0].measurement;

const getDirectories = source => readdir(source, { withFileTypes: true })
    .then(dirs => dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name));

const getThermalZones = () => getDirectories('/sys/class/thermal/')
    .then(dirs => dirs.filter(x => x.startsWith('thermal_zone')));

const readThermal = async (zone) => {
    const temperature = parseFloat((await readFile(`/sys/class/thermal/${zone}/temp`)).toString()) / 1000;
    const name = (await readFile(`'/sys/class/thermal/${zone}/type`)).toString();
    return { temperature, name };
}


let zones = [];

getThermalZones().then(entries => zones.push(...entries));

async function doMeasurement() {
    try {
        let data = [];
        for (const zone of zones) {
            try { data.push(await readThermal(zone)); } catch (err) { console.error(err); }
        }

        console.log(data);

        influx.writePoints(influxTransform(data, measurementName));
    } catch (err) {
        console.error(err);
    }
}

const cronjob = new cron.CronJob('* * * * *', doMeasurement, null, true, 'Europe/Berlin');
cronjob.start();