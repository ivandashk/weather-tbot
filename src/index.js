const { getWeatherByName } = require('./weather');
const { generateResponse, mapTelegramInputFromApi } = require('./mappers');

exports.getCurrentWeather = async (data) => {
    console.log(data.body);
    let messangerData;
    try {
        messangerData = mapTelegramInputFromApi(data.body);
    } catch {
        return generateResponse(400, 'Неверный формат входных данных. Ожидался JSON Telegram API', undefined)
    }
    const { city, chatId } = messangerData;

    if (city.startsWith('/start')) {
        return generateResponse(200, 'Введите название города, чтобы узнать актуальную погоду', chatId)
    }

    return getWeatherByName(city)
        .then(({ actualTemp, feelsLikeTemp, description, suggestions }) => {
            const replyText = `${city}: ${description}.\nТемпература: ${actualTemp} °C, ощущается как ${feelsLikeTemp} °C.\n\n${suggestions}`;
            console.log(`SUCCESS: chatId: ${chatId}, город: ${city}, температура: ${actualTemp}`);
            return generateResponse(200, replyText, chatId);
        }).catch((err) => {
            const message = err ? err : `Ошибка при определении погоды. Попробуйте позднее`;
            return generateResponse(200, message, chatId)
        });
}
