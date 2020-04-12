const getWeatherByCoordinates = require('./getWeatherByCoordinates');

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

    const replyText = `Сегодня в городе ${city} ${condition}\nТемпература: ${temp} °C, ощущается как ${feels_like} °C`;

    const answer = JSON.stringify({
        method: 'sendMessage',
        chat_id: chatId, 
        reply_to_message_id: message_id, 
        text : replyText
    });
    const encodedAnswer = new Buffer.from(answer).toString('base64');

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': true,
        'body': encodedAnswer
    }
};