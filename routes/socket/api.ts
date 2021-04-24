'use strict';

const express: any = require('express');
export const router = express.Router();

const server = require('ws').Server;
const socket = new server({port: 3001});

const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();
emitter.setMaxListeners(50);

const SocketResponder = require('./socket_responder');

const socket_responder = new SocketResponder(socket, emitter);

const schedule = require("node-schedule");

/* GET home page. */
router.get('/', (req: any, res: any, next: any) => {
  res.render('index', { title: 'Express' });
});

router.get('/broadcast/:data', (req: any, res: any, next: any) => {
	socket_responder.broadcast({message: req.params.data}); // client === null -> broadcast!
	res.json({code: 0, message: ""});
});

 const job = schedule.scheduleJob({second:0}, () => {
 		const time = new Date().toLocaleString();
 		socket_responder.broadcast({message: time});
 	}
 );

module.exports = router;
