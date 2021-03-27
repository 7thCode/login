'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Site: any = require('../models/site');
const Element: any = require('../models/Element');

const https = require('https');
const libxmljs = require('libxmljs');

// http://localhost:3000/scraper/stock/1419

router.get('/sites/scrape/:id', [(request: any, response: any): void => {
	try {
		const id = request.params.id;
		Site.findOne({_id: id}).then((site: any) => {
			const url = site.url;
			const path = site.path;
			https.get(url, (res: any) => {
				let html: string = '';
				res.on('data', (line: string) => html += line);
				res.on('end', () => {
					let dom: any = null;
					try {
						dom = libxmljs.parseHtml(html);
						if (dom) {
							const element: any = dom.get(path);
							response.json({error: null, result: element.text()});
						} else {
							response.json({error: {code: -1, message: 'parse error.'}, result: null});
						}
					} catch (error) {
						response.json({error: {code: -1, message: error.message}, result: null});
					}
				});
			});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	} catch (error) {
		response.json({error: error, result: null});
	}
}]);


router.get('/sites/scrapeall', [
	(request: any, response: any): void => {
		Site.find({}).then((sites: any) => {
			const promises: Promise<any>[] = [];
			sites.forEach((site: any) => {
				const promise: Promise<any> = new Promise<any>((resolve, reject): void => {
					const url = site.url;
					const path = site.path;
					https.get(url, (res: any) => {
						let html: string = '';
						res.on('data', (line: string) => html += line);
						res.on('end', () => {
							let dom: any = null;
							try {
								dom = libxmljs.parseHtml(html);
								if (dom) {
									const element: any = dom.get(path);
									const record: any = new Element();
									record.name = site.name;
									record.create = new Date();
									record.content.text = element.text();
									record.save().then((record: any) => {
										resolve(record);
									}).catch((error: any) => {
										resolve(error);
									});
								} else {
									resolve({});
								}
							} catch (error) {
								resolve(error);
							}
						});
					});
				});
				promises.push(promise);

				Promise.all(promises).then((result): void => {
					if (result.length === promises.length) {
						response.json({error: null, result: "OK"});
					}
				}).catch((error): void => {
					response.json({error: error, result: null});
				});
			});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}]);

router.get('/sites/query/:query', [
	(request: any, response: any): void => {
		Site.find({}).then((sites: any) => {
			response.json({error: null, result: sites});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}]);

router.post('/sites', [
	(request: any, response: any): void => {
		const site: any = new Site();
		const body = request.body;
		site.name = body.name;
		site.url = body.url;
		site.path = body.path;
		site.save().then((site: any) => {
			response.json({error: null, result: site});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}]);

router.get('/sites/:id', [
	(request: any, response: any): void => {
		const id = request.params.id;
		Site.findOne({_id: id}).then((site: any) => {
			response.json({error: null, result: site});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}]);

router.put('/sites/:id', [
	(request: any, response: any): void => {
		const id = request.params.id;
		const body = request.body;
		const setter: any = {
			$set: {
				name: body.name,
				url: body.url,
				path: body.path,
			}
		};
		Site.findOneAndUpdate({_id: id}, setter, {upsert: false}).then((site: any) => {
			response.json({error: null, result: site});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}]);

router.delete('/sites/:id', [
	(request: any, response: any): void => {
		const id = request.params.id;
		Site.findOneAndRemove({_id: id}).then((result: any) => {
			response.json({error: null, result: result});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}]);

module.exports = router;
