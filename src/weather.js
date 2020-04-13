const http = require('http');
const { kelvToCels } = require('./mappers');

exports.getWeatherByName = (name) => {
    return new Promise((resolve, reject) => {
        http.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.OPEN_WEATHER_API_KEY}`, (res) => {
            const { statusCode } = res;
            console.log(statusCode)

            if (statusCode !== 200) {
                console.log(`Weather API request status code: ${statusCode}`)
                reject('Не удалось получить погоду для города. Возможно, название города введено некорректно');
            }

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    const { temp, feels_like } = parsedData.main;
                    resolve({ actualTemp: kelvToCels(temp), feelsLikeTemp: kelvToCels(feels_like) });
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