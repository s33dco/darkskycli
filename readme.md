### Welcome to Dark Sky CLI!

### Check the weather for anytime, anywhere right from your terminal.

First add the package,

`npm -i darkskycli --global`


Secondly create a file in the darkskycli directory .env (use .env.example as a template), add the api keys for [Google](https://developers.google.com/maps/documentation/geocoding/get-api-key) (geolocation) and [Dark Sky](https://darksky.net/dev/register) (weather api). Save the file and you're good to go.

# Run from the command line parsing options, 

weather in Paris today

`weather -p paris`

weather in Paris at Christmas

`weather -p paris -d 25dec2018`

weather in Barcelona for New Years in Catalan ? 

`weather -p Barcelona -d 01jan2019 -l ca`

need help ?

`weather -h`

Units are automatically set based on geographic location, set to us for imperial, si for metric or uk2 if you like your temperature in celcius but your distance in miles.

Language defaults to English and accepts most ISO 639-1 two letter language codes.

For full details visit the [Dark Sky API](https://darksky.net/dev/docs) docs.

