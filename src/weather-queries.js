const https = require('https');

exports.getWeatherByCoordinates = async (lat, lon) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            headers: {
                'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY
            }
        };

        https.get(`https://api.weather.yandex.ru/v1/forecast?lat=${lat}&lon=${lon}`, requestOptions, (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                reject(`Query status code: ${statusCode}`);
            }

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(e.message);
                }
            });
        }).on('error', (e) => {
            reject(e.message);
        })
    })
}