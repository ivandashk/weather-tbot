const { getWeatherByCoordinates, mapWeatherCondition } = require('./weather');

exports.getCurrentWeather = async (data) => {
    const {
        message: {
            chat: {
                id: chatId
            },
            message_id,
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

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': true,
        'body': JSON.stringify({
            method: 'sendMessage',
            chat_id: chatId, 
            reply_to_message_id: message_id, 
            text : new Buffer.from(replyText).toString('base64')
        })
    }
};