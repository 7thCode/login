const websocket = require('ws');

export interface ISocketResponder {
	onOpen(): void;

	onClose(): void;

	onRequest(client: any, data: any): void;

	onResponse(client: any, data: any): void;

	onResponseOthers(client: any, data: any): void;

	onBroadcast(client: any, data: any): void;
}

/*
*
*
*
* */
export abstract class SocketResponderBase {

	protected emitter: any = null;
	protected socket: any = null;

	protected constructor(socket: any, emitter: any) {

		this.emitter = emitter;
		this.socket = socket;

		this.socket.on('connection', (connected_client: any): void => {
			connected_client.on('message', (data: string, flags: any): void => {
				const packet = JSON.parse(data);
				if (this.onRequest(connected_client, packet)) {
					socket.clients.forEach((each_client: any): void => {
						if (each_client.readyState === websocket.OPEN) {
							let response = null;
							if (connected_client === each_client) {
								response = this.onResponse(each_client, packet);
							} else {
								response = this.onResponseOthers(each_client, packet);
							}
							if (response) {
								each_client.send(JSON.stringify(response));
							}
						}
					});
				}
			});

			connected_client.on('close', (): void => {
				this.onClose();
			});

		});

		// server -> client
		this.emitter.on('broadcast', (data: any): void => {
			socket.clients.forEach((each_client: any): void => {
				if (each_client.readyState === websocket.OPEN) {
					const response = this.onBroadcast(each_client, data);
					if (response) {
						each_client.send(JSON.stringify(response));
					}
				}
			});
		});
	}

	protected broadcast(data: any): void {
		this.emitter.emit('broadcast', data);
	}

	protected onClose(): void {

	}

	protected onRequest(client: any, data: any): boolean {
		return true;
	}

	protected onResponse(client: any, data: any): any {
		return data;
	}

	protected onResponseOthers(client: any, data: any): any {
		return data;
	}

	protected onBroadcast(client: any, data: any): any {
		return data;
	}
}

module.exports = SocketResponderBase;


