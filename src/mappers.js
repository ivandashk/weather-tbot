const kelvToCels = (kelv) => {
    return +(kelv - 273).toFixed();
}

exports.mapWeatherDataFromApi = (data) => {
    const {
        weather: [{
            description
        }],
        main: {
            temp,
            feels_like,
            humidity
        },
        rain,
        snow,
        wind: {
            speed: windSpeed
        }
    } = JSON.parse(data);

    return {
        actualTemp: kelvToCels(temp),
        feelsLikeTemp: kelvToCels(feels_like),
        description,
        windSpeed,
        humidity,
        rain,
        snow
    }
}

exports.mapTelegramInputFromApi = (body) => {
    const { message, edited_message } = JSON.parse(body)

    return {
        chatId: message ? message.chat.id : edited_message.chat.id,
        city: message ? message.text : edited_message.text
    }
}

exports.generateResponse = (statusCode, responseText, chatId) => {
    const answerBody = JSON.stringify({
        method: 'sendMessage',
        chat_id: chatId, 
        text: responseText
    })

    return {
        'statusCode': statusCode,
        'headers': {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': true,
        'body': new Buffer.from(answerBody).toString('base64')
    }	
}