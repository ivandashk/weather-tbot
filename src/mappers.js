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
            feels_like
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
        rain,
        snow
    }
}

exports.mapTelegramInputFromApi = (body) => {
    const {
        message: {
            chat: {
                id: chatId
            },
            text: city
        }
    } = JSON.parse(body);

    return {
        chatId,
        city
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