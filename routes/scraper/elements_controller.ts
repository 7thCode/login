'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Element: any = require('../../models/element');

export class Elements {

	constructor() {
	}

	public query(request: any, response: any):void {
		Element.find({}).then((sites: any) => {
			response.json({error: null, result: sites});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}

	public get(request: any, response: any):void {
		const id = request.params.id;
		Element.findOne({_id: id}).then((site: any) => {
			response.json({error: null, result: site});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}

	public delete(request: any, response: any): void {
		const id = request.params.id;
		Element.findOneAndRemove({_id: id}).then((result: any) => {
			response.json({error: null, result: result});
		}).catch((error: any) => {
			response.json({error: error, result: null});
		});
	}

}

module.exports = Elements;
