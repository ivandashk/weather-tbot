const { getWeatherByCoordinates } = require('./weather');
const { generateResponse, mapTelegramInputFromApi } = require('./mappers');

exports.getCurrentWeather = async (data) => {
    let messangerData;
    try {
        messangerData = mapTelegramInputFromApi(data.body);
    } catch {
        return generateResponse(400, 'Неверный формат входных данных. Ожидался JSON Telegram API', undefined)
    }
    const { city, chatId } = messangerData;

    const { actualTemp, feelsLikeTemp, condition } = await getWeatherByCoordinates(55.75396, 37.620393).catch(() => {
        return generateResponse(500, `Ошибка при определении погоды. Попробуйте позднее`, chatId)
    });

    const replyText = `Сейчас в городе ${city} ${condition}\nТемпература: ${actualTemp} °C, ощущается как ${feelsLikeTemp} °C`;
    console.log(`SUCCESS: chatId: ${chatId}, город: ${city}, температура: ${actualTemp}`);
    return generateResponse(200, replyText, chatId);
}
