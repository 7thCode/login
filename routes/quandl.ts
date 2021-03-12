'use strict';

const express: any = require('express');
export const router: any = express.Router();

const request: any = require('request');
const config: any = require('./config');

class Quandl {

	public page: number;
	public size: number;
	private api_key: string;

	constructor(key: string) {
		this.api_key = key;
		this.page = 1;
		this.size = 100;
	}

	public getDatabase(callback: (error: any, data: any) => void) {
		const get_options: any = {
			url: 'https://www.quandl.com/api/v3/databases/?api_key=' + this.api_key + '&current_page=' + this.page + '&per_page=' + this.size,
			method: 'GET',
			json: true,
		};

		request(get_options, (error: any, from_receiver: any, body: any): void => {
			callback(error, body);
		});
	}

	public getData(database_code: string, dataset_code: string, callback: (error: any, data: any) => void) {
		const get_options: any = {
			url: 'https://www.quandl.com/api/v3/datasets/' + database_code + '/' + dataset_code + '?api_key=' + this.api_key + '&current_page=' + this.page + '&per_page=' + this.size,
			method: 'GET',
			json: true,
		};

		request(get_options, (error: any, from_receiver: any, body: any): void => {
			callback(error, body);
		});
	}
}

const quandl = new Quandl(config.key);

module.exports = router;

router.get('/:page', [(request: any, response: any): void => {

	quandl.size = 40;
	quandl.page = request.params.page;

	quandl.getDatabase((error, data) => {
		if (!error) {
			response.render('index', {databases: data.databases});
		} else {
			response.render('error', {message: error.message, error: error});
		}
	});

}]);

router.get('/dataset/:database_code/:dataset_code/:page', [(request: any, response: any): void => {

	quandl.size = 40;
	quandl.page = request.params.page;

	quandl.getData(request.params.database_code, request.params.dataset_code,(error, data) => {
		if (!error) {
			response.render('dataset', {dataset: data.dataset});
		} else {
			response.render('error', {message: error.message, error: error});
		}
	});

}]);

module.exports = router;
