if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const yargs = require('yargs');
const axios = require('axios');
const moment= require('moment');
const argv  = yargs
							.options({
								p: {
									demand: true,
									alias: 'place',
									describe: 'Location for weather report.',
									string: true
								},
								d: {
									alias: 'date',
									describe: 'Date for weather report - leave blank for today.',
									default: moment().format('DDMMMYYYY'),
									string: true
								},
								u: {
									alias: 'units',
									describe: 'Units used defaults based on location.',
									default: 'auto',
									choices: ['ca', 'uk2', 'us', 'si', 'auto'],
									string: true
								},
								l: {
									alias: 'langauge',
									describe: 'Langauge for weather report (ISO 639-1).',
									default: 'en',
									string: true
								}						
							})
							.help()
							.alias('help', 'h')
							.argv;


let place = encodeURIComponent(argv.place);
let date  = argv.date;
let lang  = argv.langauge;
let units = argv.units;
let when  = moment(`${date}`, 'DDMMMYYYY').unix();
let where = encodeURIComponent(argv.place);
console.log(when);

let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&address=${where}`;

console.log("\nPowered by Dark Sky - https://darksky.net/poweredby/");

axios.get(geocodeUrl, {timeout: 5000}).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.');
	}
	let lat = response.data.results[0].geometry.location.lat;
	let lng = response.data.results[0].geometry.location.lng;
	console.log(`\n${response.data.results[0].formatted_address}`);
	let weatherUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng},${when}?units=${units}&lang=${lang}`;
	return axios.get(weatherUrl);
}).then((response) => {
		if (response.error) {
			throw new Error(response.error);
		}
   	let reportDate 	        = response.data.currently.time;
		let temperature 				= response.data.currently.temperature;
		let apparentTemperature = response.data.currently.apparentTemperature;
		let summary							=	response.data.currently.summary;
		console.log(moment(reportDate).format('DDMMMYYYY'));
		console.log(`${summary},${temperature} ${apparentTemperature}.\n`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('could not connect to api servers.');
	} else {
		console.log(e.message);
	}
});
