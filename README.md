# Умный сервис прогноза погоды

**Уровень сложности:** Задача со звездочкой  
**Язык программирования и технологии:** JavaScript (ES6+, Node 12), Yandex Cloud Functions **(yc CLI), OpenWeatherMap, Telegram API  
**Пользовательский интерфейс:** Telegram чат-бот  
**Формат ответа:**  
```
{Город}: {Описание погоды}.
Температура: {t1} °C, ощущается как {t2} °C.

{Совет о том, как лучше одеться}
```
Формат ответа, если в базе OpenWeatherMap не удалось найти город
```
Не удалось получить погоду. Возможно, название города введено некорректно
```

**Как запустить вашу программу?**
Бот доступен в проде в телеграме (@YandexCloudWeatherBot)[https://t.me/YandexCloudWeatherBot]

Запустить собстсвенную копию бота можно выполнив следующие шаги:
1. Создать .env файл в корне проекта с содержимым
```
OPEN_WEATHER_API_KEY="мой API ключ"
```
Ключ можно получить после регистрации на [OpenWeatherMap](https://openweathermap.org/api)
2. [Установить и настроить утилиту yc](https://cloud.yandex.ru/docs/cli/quickstart)
3. Создать функцию с названием `get-default-weather` на Yandex Cloud Functions
4. Выполнить `npm run up` из репозитория. На Yandex Cloud Functions создастся новая версия функции
5. Создать нового бота через бота @BotFather в Telegram
6. Связать бота и ручку через [вебхук](https://tlgrm.ru/docs/bots/api#setwebhook)
```
curl -F "url=https://functions.yandexcloud.net/{id функции}" https://api.telegram.org/bot{ключ бота, выдаваемый при регистрации в @BotFather}/setWebhook
```
URL по которому доступна функция в Yandex Cloud Functions можно узнать в поле `http_invoke_url`, выполнив команду `yc serverless function get get-default-weather` 

### Ссылки

О ботах: https://tlgrm.ru/docs/bots  
API telegram-бота: https://tlgrm.ru/docs/bots/api  
API Яндекс.Погоды: https://yandex.ru/dev/weather/doc/dg/concepts/forecast-info-docpage/  
О Yandex Cloud Functions: https://cloud.yandex.ru/docs/functions/quickstart/?utm_source=console&utm_medium=side-bar-left&utm_campaign=functions  
Используемая для telegram-бота иконка: https://www.iconfinder.com/iconsets/tiny-weather-1  