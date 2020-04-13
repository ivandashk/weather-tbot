const https = require('https');

exports.translateRuToEn = (ruName) => {
    return new Promise((resolve, reject) => {
        https.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${process.env.YANDEX_TRANSLATE_API_KEY}&text=${ruName}&lang=ru-en`, (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                console.log(`Translate API request status code: ${statusCode}`)
                reject();
            }

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve({ enCityName: parsedData.text[0] });
                } catch (e) {
                    console.log(e)
                    reject();
                }
            });
        }).on('error', (e) => {
            console.log(e)
            reject();
        })
    })
}