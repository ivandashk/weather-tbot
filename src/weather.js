const https = require('https');

const weatherConditionsMap = {
    'clear': 'ясно',
    'partly-cloudy': 'малооблачно',
    'cloudy': 'облачно с прояснениями',
    'overcast': 'пасмурно',
    'partly-cloudy-and-light-rain': 'небольшой дождь',
    'partly-cloudy-and-rain': 'дождь',
    'overcast-and-rain': 'сильный дождь',
    'overcast-thunderstorms-with-rain': 'сильный дождь, гроза',
    'cloudy-and-light-rain': 'небольшой дождь',
    'overcast-and-light-rain': 'небольшой дождь',
    'cloudy-and-rain': 'дождь',
    'overcast-and-wet-snow': 'дождь со снегом',
    'partly-cloudy-and-light-snow': 'небольшой снег',
    'partly-cloudy-and-snow': 'снег',
    'overcast-and-snow': 'снегопад',
    'cloudy-and-light-snow': 'небольшой снег',
    'overcast-and-light-snow': 'небольшой снег',
    'cloudy-and-snow': 'снег',
}

exports.mapWeatherCondition = (conditionFromApi) => {
    if (!weatherConditionsMap[conditionFromApi]) {
        throw new Error(`Неизвестный тип погоды: ${conditionFromApi}`)
    }

    return weatherConditionsMap[conditionFromApi];
}

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