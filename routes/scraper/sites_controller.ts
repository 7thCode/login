'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Site: any = require('../../models/site');
const Element: any = require('../../models/element');

const https = require('https');
const libxmljs: any = require('libxmljs');
const nodemailer: any = require('nodemailer');

const CONFIG_MODULE: any = require('config');

export class Sites {

	constructor() {
	}

	/*
	* https://support.google.com/mail/answer/185833?hl=ja
	* */
	private sendMail(sender: string, receiver: string, key: string, subject: string, text: string, callback: (error: any, info: any) => void): void {

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			port: 465,
			secure: true,
			auth: {
				user: sender,
				pass: key,
			},
		});

		const mailOptions = {
			from: sender,
			to: receiver,
			subject: subject,
			text: text
		};

		transporter.sendMail(mailOptions, (error: any, info: any) => {
			callback(error, info);
		});

	}

	public scrape(request: any, response: any): void {
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
	}

	public scrapeAll(request: any, response: any): void {
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
									if (element) {
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
			});

			Promise.all(promises).then((result): void => {

				this.sendMail('oda.mikio@gmail.com', 'oda.mikio@gmail.com', CONFIG_MODULE.key2, 'subject', 'text', (error: any, info: any) => {
					response.json({error: error, result: 'OK'});
				});

			}).catch((error): void => {
				response.json({error: error, result: null});
			});

		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}

	public query(request: any, response: any): void {
		Site.find({}).then((sites: any) => {
			response.json({error: null, result: sites});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}

	public post(request: any, response: any): void {
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
	}

	public get(request: any, response: any): void {
		const id = request.params.id;
		Site.findOne({_id: id}).then((site: any) => {
			response.json({error: null, result: site});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}

	public put(request: any, response: any): void {
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
	}

	public delete(request: any, response: any): void {
		const id = request.params.id;
		Site.findOneAndRemove({_id: id}).then((result: any) => {
			response.json({error: null, result: result});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}

}

module.exports = Sites;
