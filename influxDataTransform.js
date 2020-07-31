module.exports = {
    transformForInflux: (data, measurementName) => {
        return data.map(entry => {
            return {
                measurement: measurementName,
                fields: { temperature: entry.temperature },
                tags: { name: entry.name }
            }
        });
    }
};