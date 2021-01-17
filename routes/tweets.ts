'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Tweet: any = require('../models/tweet');

router.get('/query/:query/:option', [
	(request: any, response: any): void => {
		Tweet.find({}).then((tweets: any[]) => {
			response.json({status: 0, value: tweets, message: 'OK'});
		});
	}]);

router.get('/count/:query', [
	(request: any, response: object): void => {

	}]);

router.post('/', [
	(request: any, response: any): void => {
		const tweet: any = new Tweet();
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
