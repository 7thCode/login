const request: any = require('request');

class Quandl {

	public page: number;
	public size: number;
	private api_key: string;

	constructor(key: string) {
		this.api_key = key;
		this.page = 1;
		this.size = 100;
	}

	public getDatabase( callback: (error: any, data: any) => void) {
		const get_options: any = {
			url: 'https://www.quandl.com/api/v3/databases/?api_key=' + this.api_key + "&current_page=" + this.page + "&per_page=" + this.size,
			method: 'GET',
			json: true,
		};

		request(get_options, (error: any, from_receiver: any, body: any): void => {
			callback(error, body);
		});
	}

	public getData(database_code: string, dataset_code: string, callback: (error: any, data: any) => void) {
		const get_options: any = {
			url: 'https://www.quandl.com/api/v3/datasets/' + database_code + '/' + dataset_code + '?api_key=' + this.api_key + "&current_page=" + this.page + "&per_page=" + this.size,
			method: 'GET',
			json: true,
		};

		request(get_options, (error: any, from_receiver: any, body: any): void => {
			callback(error, body);
		});
	}
}


const quandl = new Quandl('J5eFyR9oVQvjtN1K_xkH');

quandl.getDatabase((error, data) => {
	if (!error) {
		let result = "";
		data.databases.forEach((database: any) => {
			result += "<div>" +
			"<div>" + database.database_code + "</div>" +
			"<div>" + database.description + "</div>" +
			"<img src='" + database.image + "'>" +
			"</div>";
		})
		console.log(result);
	} else {
		console.log(error.message);
	}
});

// quandl.getData('EURONEXT', 'ADYEN', (error, data) => {
// 	if (!error) {
// 		console.log(data.description);
// 	} else {
// 		console.log(error.message);
// 	}
// });
//
