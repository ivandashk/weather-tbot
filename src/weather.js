const http = require('http');
const { mapWeatherDataFromApi } = require('./mappers');

const getSuggestions = (avgTemp, windSpeed, rain, snow) => {
    if (rain) {
        return 'Сегодня лучше взять с собой зонт 🌧';
    } else if (snow) {
        return 'Сегодня снежно. Если взять варежки, можно будет поиграть в снежки ❄️';
    } else if (windSpeed >= 15) {
        return 'На улице ветрено. Комфортнее будет с платком или в куртке с горлом.';
    } else if (avgTemp <= -15) {
        return 'В одних штанах хорошо, а в двух еще лучше.';
    } else if (avgTemp <= -10) {
        return 'На улице холодно. Рецепт успеха на сегодня: шапка и шарфик.';
    } else if (avgTemp <= 0) {
        return 'Сегодня лучше надеть пуховик.';
    } else if (avgTemp <= 10) {
        return 'Легкая куртка сделает ваш день.';
    } else if (avgTemp <= 20) {
        return 'На улице сегодня тепло. А что вы носите с джинсами?';
    } else if (avgTemp <= 30) {
        return 'Самое время для шорт и маек.';
    } else if (avgTemp > 30) {
        return 'Сегодня жарко. Лучше держаться в тени и пить больше воды ☀️';
    }
}

exports.getWeatherByName = (name) => {
    return new Promise((resolve, reject) => {
        http.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=ru`, (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                console.log(`Weather API request status code: ${statusCode}`)
                reject('Не удалось получить погоду. Возможно, название города введено некорректно');
            }

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const { actualTemp, feelsLikeTemp, description, windSpeed, rain, snow } = mapWeatherDataFromApi(rawData);
                    resolve({
                        actualTemp,
                        feelsLikeTemp,
                        description,
                        suggestions: getSuggestions((actualTemp + feelsLikeTemp) / 2, windSpeed, rain, snow)
                    });
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