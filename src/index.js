const { getWeatherByName } = require('./weather');
const { translateRuToEn } = require('./translate');
const { generateResponse, mapTelegramInputFromApi } = require('./mappers');

exports.getCurrentWeather = async (data) => {
    let messangerData;
    try {
        messangerData = mapTelegramInputFromApi(data.body);
    } catch {
        return generateResponse(400, 'Неверный формат входных данных. Ожидался JSON Telegram API', undefined)
    }
    const { city, chatId } = messangerData;

    return translateRuToEn(city)
        .then(({ enCityName }) => {
            return getWeatherByName(enCityName);
        }).then(({ actualTemp, feelsLikeTemp }) => {
            const replyText = `В городе ${city}\nТемпература: ${actualTemp} °C, ощущается как ${feelsLikeTemp} °C`;
            console.log(`SUCCESS: chatId: ${chatId}, город: ${city}, температура: ${actualTemp}`);
            return generateResponse(200, replyText, chatId);
        }).catch((err) => {
            const message = err ? err : `Ошибка при определении погоды. Попробуйте позднее`;
            return generateResponse(200, message, chatId)
        });
}
