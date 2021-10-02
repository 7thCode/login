'use strict';

const express: any = require('express');
export const router: any = express.Router();

const http = require('http');

export class Gensim {

	constructor() {
	}

	public similar(request: any, response: any): void {
		try {
			const positive = request.query.p;
			const negative = request.query.n;
			http.get("http://localhost:5000/similar?p=" + positive + "&n=" + negative, (res: any) => {
				let buffer: string = '';
				res.on('data', (line: string) => buffer += line);
				res.on('end', () => {
					response.send(buffer);
				});
			});
		} catch (error) {
			response.json({error: error, result: null});
		}
	}
}

module.exports = Gensim;
