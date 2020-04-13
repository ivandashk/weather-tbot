const weatherConditionsMap = {
    'clear': 'ясно',
    'partly-cloudy': 'малооблачно',
    'cloudy': 'облачно с прояснениями',
    'overcast': 'пасмурно',
    'partly-cloudy-and-light-rain': 'небольшой дождь',
    'partly-cloudy-and-rain': 'дождь',
    'overcast-and-rain': 'сильный дождь',
    'overcast-thunderstorms-with-rain': 'сильный дождь, гроза',
    'cloudy-and-light-rain': 'небольшой дождь',
    'overcast-and-light-rain': 'небольшой дождь',
    'cloudy-and-rain': 'дождь',
    'overcast-and-wet-snow': 'дождь со снегом',
    'partly-cloudy-and-light-snow': 'небольшой снег',
    'partly-cloudy-and-snow': 'снег',
    'overcast-and-snow': 'снегопад',
    'cloudy-and-light-snow': 'небольшой снег',
    'overcast-and-light-snow': 'небольшой снег',
    'cloudy-and-snow': 'снег',
}

mapWeatherCondition = (conditionFromApi) => {
    if (!weatherConditionsMap[conditionFromApi]) {
        throw new Error(`Неизвестный тип погоды: ${conditionFromApi}`)
    }

    return weatherConditionsMap[conditionFromApi];
}

exports.mapWeatherDataFromApi = (data) => {
    const parsedData = JSON.parse(data);
    const {
        fact: {
            temp,
            feels_like,
            condition
        }
    } = parsedData;
    const mappedCondition = mapWeatherCondition(condition);

    return { actualTemp: temp, feelsLikeTemp: feels_like, condition: mappedCondition };
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
