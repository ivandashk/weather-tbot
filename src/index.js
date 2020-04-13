const { getWeatherByCoordinates, mapWeatherCondition } = require('./weather');
const { generateResponse } = require('./mappers');

exports.getCurrentWeather = async (data) => {
    const {
        message: {
            chat: {
                id: chatId
            },
            text: city
        }
    } = JSON.parse(data.body);

    const {
        fact: {
            temp,
            feels_like,
            condition
        }
    } = await getWeatherByCoordinates(55.75396, 37.620393);

    const replyText = `Сейчас в городе ${city} ${mapWeatherCondition(condition)}\nТемпература: ${temp} °C, ощущается как ${feels_like} °C`;
    return generateResponse(200, replyText, chatId);
}
