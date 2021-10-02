'use strict';

const express: any = require('express');
export const router: any = express.Router();

const http = require('http');

export class Password {

	constructor() {
	}

	public strength(request: any, response: any): void {
		try {
			const password = request.params.password;
			http.get("http://localhost:5000/pass?p=" + password, (res: any) => {
				let html: string = '';
				res.on('data', (line: string) => html += line);
				res.on('end', () => {
					response.send(html);
				});
			});
		} catch (error) {
			response.json({error: error, result: null});
		}
	}

	public match(request: any, response: any): void {
		try {
			const password = request.params.password;
			const match = (password === "ab");
			response.json({match: match})
		} catch (error) {
			response.json({error: error, result: null});
		}
	}

}

module.exports = Password;
