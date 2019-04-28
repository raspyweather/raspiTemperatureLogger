module.exports = {
    transformForInflux: (data, measurementName) => {
        return [{
            measurement: measurementName,
            fields: {},
            tags: {
                temperature: data
            }
        }];
    }
};