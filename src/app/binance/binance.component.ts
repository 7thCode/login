import { Component, OnInit } from '@angular/core';

import {BinanceService} from './binance.service';

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

@Component({
  selector: 'app-binance',
  templateUrl: './binance.component.html',
  styleUrls: ['./binance.component.css']
})

export class BinanceComponent implements OnInit {

	message: string = '';
	ticks: Ticker[] = [];

  constructor(
	  private socket: BinanceService,
  ) { }

  ngOnInit(): void {
	  this.socket.addMessageListener((name, event) => {
		  if (name === 'message') {
			  this.ticks = JSON.parse(event.data);
		  }
	  });
  }

}
