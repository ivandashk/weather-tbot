const https = require('https');
const { mapWeatherDataFromApi } = require('./mappers');

exports.getWeatherByCoordinates = async (lat, lon) => {
    return new Promise((resolve, reject) => {
        const requestOptions = {
            headers: {
                'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY
            }
        }

        https.get(`https://api.weather.yandex.ru/v1/forecast?lat=${lat}&lon=${lon}`, requestOptions, (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                console.log(`Weather API request status code: ${statusCode}`)
                reject();
            }

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    resolve(mapWeatherDataFromApi(rawData));
                } catch (e) {
                    console.log(e)
                    reject();
                }
            });
        }).on('error', (e) => {
            console.log(e)
            reject();
        })
    })
}