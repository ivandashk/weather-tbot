source .env

zip src/**.* target.zip

yc serverless function version create \
    --function-name=get-default-weather \
    --runtime nodejs12 \
    --entrypoint index.getCurrentWeather \
    --memory 128m \
    --execution-timeout 5s \
    --source-path ./target.zip \
    --environment YANDEX_WEATHER_API_KEY=9e3e7a36-3484-4c1a-a29b-41df0517e835

rm -f target.zip
