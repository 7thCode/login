'use strict';

const express: any = require('express');
export const router: any = express.Router();


const https = require('https');
const libxmljs = require("libxmljs");

// http://localhost:3000/scraper/stock/1419

router.get('/stock/:code', [
	(request: any, response: any): void => {
		try {
			const code:string = request.params.code;
			const url = 'https://www.nikkei.com/nkd/company/?scode=' + code;
			https.get(url, (res: any) => {
				let html: string = '';
				res.on('data', (line: string) => html += line);
				res.on('end', () => {
					const dom: any = libxmljs.parseHtml(html);
					const element: any = dom.get('/html/body/div[2]/div/div[7]/div/div/div/div[1]/div[4]/dl[1]/dd/text()');
					response.send(element.text());
				});
			});
		} catch (e) {
			response.json({status: e.code, value: [], message: e.message});
		}
	}]);

module.exports = router;
