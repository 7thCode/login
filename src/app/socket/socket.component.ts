import { Component, OnInit } from '@angular/core';

import {SocketService} from './socket.service';
import {APIService} from './api.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})

export class SocketComponent implements OnInit {

	message: string = '';
	text: string;
	packet: any = {message: 'ping!'};

  constructor(
	  private socket: SocketService,
	  private api: APIService
  ) { }

  ngOnInit(): void {
	  this.socket.addMessageListener((name, event) => {
		  if (name === 'message') {
			  this.packet = JSON.parse(event.data);
			  this.message = this.packet.message;
		  }
	  });
  }

	public send() {
		this.socket.request(JSON.stringify(this.packet));
	}

	public broadcast(data: string) {
		this.api.broadcast(data, (error, message) => {

		});
	}

}
