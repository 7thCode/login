'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Password: any = require('./password_controller');
const password_controller = new Password();

router.get('/strength/:password', [(request: any, response: any): void => {
	password_controller.strength(request, response);
}]);

router.get('/match/:password', [(request: any, response: any): void => {
	password_controller.match(request, response);
}]);

module.exports = router;
