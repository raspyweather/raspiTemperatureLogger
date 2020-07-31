module.exports = {
    transformForInflux: (data, measurementName) => {
        return data.map(entry => {
            return {
                measurement: measurementName,
                fields: { ...entry },
                tags:{ }
            }
        });
    }
};