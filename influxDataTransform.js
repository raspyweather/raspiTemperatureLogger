module.exports = {
    transformForInflux: (data, measurementName) => {
        return [{
            measurement: measurementName,
            fields: { temperature: data},
            tags: {
               device:'pi'
            }
        }];
    }
};