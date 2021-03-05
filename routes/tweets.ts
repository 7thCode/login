'use strict';

const express: any = require('express');
export const router: any = express.Router();

const mongodb: any = require('mongodb');

const Account: any = require('../models/account');
const Tweet: any = require('../models/tweet');
const Relation: any = require('../models/relation');

/*
router.get('/query/:query/:option', [
	(request: any, response: any): void => {
		try {
			const query: any = JSON.parse(request.params.query);
			const option: any = JSON.parse(request.params.option);
			Tweet.find(query,{}, option).then((tweets: any[]) => {
				response.json({status: 0, value: tweets, message: 'OK'});
			});
		} catch (e) {
			response.json({status: e.code, value: [], message: e.message});
		}
	}]);
*/

router.get('/query/friend/:query/:option', [
	(request: any, response: any): void => {
		try {

			const operator = request.user;

			const option_to_aggregater = (aggregater: any[], option: any) => {
				if (option.sort) {
					if (Object.keys(option.sort).length > 0) {
						aggregater.push({$sort: option.sort});
					}
				}

				if (option.skip) {
					aggregater.push({$skip: option.skip});
				}

				if (option.limit) {
					aggregater.push({$limit: option.limit});
				}
			};

			const build_friend_aggrigater = (aggregater: any[], query: any) => {
				// 1
				aggregater.push({$lookup: {from: 'relations', localField: 'user_id', foreignField: 'from_user_id', as: 'relation'}});

				// 2
				aggregater.push({$unwind: {path: '$relation', preserveNullAndEmptyArrays: false}});

				// 3
				aggregater.push({$match: {'relation.to_user_id': mongodb.ObjectId(operator._id)}});

				//		aggregater.push({$match: {"relation.to_user_id": request.user._id}});
			};

			const friend_aggregater: any = [];
			const friend_query: any = JSON.parse(request.params.query);
			const friend_option: any = JSON.parse(request.params.option);
			build_friend_aggrigater(friend_aggregater, friend_query);
			option_to_aggregater(friend_aggregater, friend_option);

			Tweet.aggregate(friend_aggregater).then((friend_tweets: any[]) => {
				response.json({status: 0, value: friend_tweets, message: 'OK'});
			});

		} catch (e) {
			response.json({status: e.code, value: [], message: e.message});
		}
	}]);

router.get('/query/self/:query/:option', [
	(request: any, response: any): void => {
		try {

			const operator = request.user;

			const option_to_aggregater = (aggregater: any[], option: any) => {
				if (option.sort) {
					if (Object.keys(option.sort).length > 0) {
						aggregater.push({$sort: option.sort});
					}
				}

				if (option.skip) {
					aggregater.push({$skip: option.skip});
				}

				if (option.limit) {
					aggregater.push({$limit: option.limit});
				}
			};

			const build_self_aggrigater = (aggregater: any[], query: any) => {
				aggregater.push({$match: {user_id: mongodb.ObjectId(operator._id)}});
			};

			const self_aggregater: any = [];
			const self_query: any = JSON.parse(request.params.query);
			const self_option: any = JSON.parse(request.params.option);
			build_self_aggrigater(self_aggregater, self_query);
			option_to_aggregater(self_aggregater, self_option);

			Tweet.aggregate(self_aggregater).then((self_tweets: any[]) => {
				response.json({status: 0, value: self_tweets, message: 'OK'});
			});

		} catch (e) {
			response.json({status: e.code, value: [], message: e.message});
		}
	}]);

router.post('/', [
	(request: any, response: any): void => {
		const tweet: any = new Tweet();
		tweet.create = new Date();
		tweet.user_id = request.user._id;
		tweet.content.text = request.body.text;
		tweet.content.username = request.user.username;
		tweet.save((error: any, result: any) => {
			if (!error) {
				response.json({status: 0, value: result, message: 'OK'});
			} else {
				response.json({status: error.code, value: null, message: error.message});
			}
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

router.post('/relation', [
	(request: any, response: any): void => {
		const relation: any = new Relation();
		relation.from_user_id = request.user._id;
		relation.content.type = request.body.type;
		const to: string = request.body.to;
		Account.findOne({username: to}).then((user: any) => {
			if (user) {
				relation.to_user_id = user._id;
				relation.save((error: any, result: any) => {
					if (!error) {
						response.json({status: 0, value: result, message: 'OK'});
					} else {
						response.json({status: error.code, value: null, message: error.message});
					}
				});
			} else {
				response.json({status: -1, value: null, message: 'no user'});
			}
		}).catch((error: any) => {
			response.json({status: error.code, value: null, message: error.message});
		});
	}]);

module.exports = router;
