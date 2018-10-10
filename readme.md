Welcome to Dark Sky CLI!

Check the weather for anytime, anywhere right from your terminal.

First add the package,

npm -i darkskycli --global

Secondly find where the package is installed, on a mac with node installed via Homebrew this will be /usr/local/lib/node_modules. Create a file in the darkskycli directory .env , add the api keys for Google geolocation and Dark Sky. Save the file and you're good to go.

Executable from the CLI four arguements are accepted, place, when, langauage, units. 

Units are automatically set based on geographic location, set to us for imperial, si for metric or uk2 if you like your temperature in celcius but your distance in miles.

Language defaults to English and accepts most ISO 639-1 two letter language codes.

For full details visit the Dark Sky API docs.

