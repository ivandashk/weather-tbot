source .env

cd src/

zip -DX target *.js

yc serverless function version create \
    --function-name=get-default-weather \
    --runtime nodejs12 \
    --entrypoint index.getCurrentWeather \
    --memory 128m \
    --execution-timeout 5s \
    --source-path ./target.zip \
    --environment YANDEX_WEATHER_API_KEY=$YANDEX_WEATHER_API_KEY

rm -f target.zip