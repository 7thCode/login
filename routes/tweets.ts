'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Tweet: any = require('../models/tweet');

router.get('/query/:query/:option', [
	(request: any, response: any): void => {
		try {
			const query_string: string = request.params.query;
			const query_object = JSON.parse(query_string);
			const option_string: string = request.params.option;
			const option_object = JSON.parse(option_string);

			Tweet.find(query_object,{}, option_object).then((tweets: any[]) => {
				response.json({status: 0, value: tweets, message: 'OK'});
			});
		} catch (e) {
			response.json({status: e.code, value: [], message: e.message});
		}
	}]);

router.get('/count/:query', [
	(request: any, response: object): void => {

	}]);

router.post('/', [
	(request: any, response: any): void => {
		const tweet: any = new Tweet();
		tweet.create = new Date();
		tweet.content.text = request.body.text;
		tweet.content.username = request.user.username;
		tweet.save((error: any, result: any) => {
			response.json({status: 0, value: result, message: 'OK'});
		});
	}]);

router.get('/:id', [
	(request: any, response: object): void => {

	}]);

router.put('/:id', [
	(request: any, response: object): void => {

	}]);

router.delete('/:id', [
	(request: any, response: object): void => {

	}]);

module.exports = router;
