'use strict';

const express: any = require('express');
export const router: any = express.Router();

const Gensim: any = require('./gensim_controller');
const gensim_controller = new Gensim();

router.get('/similar', [(request: any, response: any): void => {
	gensim_controller.similar(request, response);
}]);

module.exports = router;
