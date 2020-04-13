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

exports.kelvToCels = (kelv) => {
    return Math.ceil(kelv - 273);
}