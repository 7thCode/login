'use strict';

const express: any = require('express');
export const router = express.Router();

const server = require('ws').Server;
const socket = new server({port: 3001});

const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();
emitter.setMaxListeners(50);

const SocketResponder = require('../socket/socket_responder');

const socket_responder = new SocketResponder(socket, emitter);

const Binance: any = require('node-binance-api');

const config: any = require("config");

const binance: any = new Binance().options(config.binance_option);

interface Ticker {
	eventType: string,
	eventTime: number,
	symbol: string,
	close: string,
	open: string,
	high: string,
	low: string,
	volume: string,
	quoteVolume: string
}

binance.futuresMiniTickerStream( (miniTicker: Ticker[]) => {
 	const oneTick:Ticker = miniTicker[0];
 	socket_responder.broadcast(miniTicker);
} );

// binance.futuresBookTickerStream( 'BTCUSDT', console.log );
// binance.futuresBookTickerStream( 'BTCUSDT', (info) => {console.log(info)} );

module.exports = router;
