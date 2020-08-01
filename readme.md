# raspiTemperatureLogger

Simple Temperatuer logging project which uses ```/sys/class/thermal``` for logging system temperatures into InfluxDB.
Uses ```temperatures``` as measurement name.

## Environment Variables

- ```DB_HOST``` Address of the database
- ```DB_USER``` Username of the database
- ```DB_PASS``` Password of the database
- ```DB_NAME``` Name of the database

## Tested Devices

- RockPi 4
- Raspi 2B+

## Compatibility

Should work (in theory :) ) with any linux/unix which uses thermal zones in ```/sys/class/thermal/thermal_zone*```. 

In particular, ```/sys/class/thermal_zone*/type``` and ```/sys/class/thermal_zone*/temp``` are used to perform readouts.

Feel free to expand tested device list if it works on your machine[s].