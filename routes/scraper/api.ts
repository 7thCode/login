'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Sites: any = require('./sites_controller');
const sites_controller = new Sites();

const Elements: any = require('./elements_controller');
const elements_controller: any = new Elements();

router.get('/sites/scrape/:id', [(request: any, response: any): void => {
	sites_controller.scrape(request, response);
}]);

router.get('/sites/scrapeall', [(request: any, response: any): void => {
	sites_controller.scrapeAll(request, response);
}]);

router.get('/sites/query/:query', [(request: any, response: any): void => {
	sites_controller.query(request, response);
}]);

router.post('/sites', [(request: any, response: any): void => {
	sites_controller.post(request, response);
}]);

router.get('/sites/:id', [(request: any, response: any): void => {
	sites_controller.get(request, response);
}]);

router.put('/sites/:id', [(request: any, response: any): void => {
	sites_controller.put(request, response);
}]);

router.delete('/sites/:id', [(request: any, response: any): void => {
	sites_controller.delete(request, response);
}]);




router.get('/elements/query/:query', [(request: any, response: any): void => {
	elements_controller.query(request, response);
}]);

router.get('/elements/:id', [(request: any, response: any): void => {
	elements_controller.get(request, response);
}]);

router.delete('/elements/:id', [(request: any, response: any): void => {
	elements_controller.delete(request, response);
}]);

module.exports = router;
