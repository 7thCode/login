
const SocketResponderBase = require('./socket_responder_base');

export class SocketResponder extends SocketResponderBase {

	private count = 0;

	constructor(socket: any, emitter: any) {
		super(socket, emitter);
	}

	protected onOpen(): void {

	}

	protected onClose(): void {

	}

	protected onRequest(client: any, data: any): boolean {
		return true;
	}

	public onResponse(client: any, data: any): void {

		this.count++;
		const address = client._socket.remoteAddress;

		data.message = 'response! ' + address + "(" + this.count + ")";

		return data;
	}

	public onResponseOthers(client: any, data: any): any {

		const address = client._socket.remoteAddress;
		// 		const r = IPV6.ToIPV6(client._socket.remoteAddress);

		data.message = 'others! ' + address + "(" + this.count + ")";
		return data;
	}

	public onBroadcast(client: any, data: any): any {

	//	const address = client._socket.remoteAddress;
		// 		const r = IPV6.ToIPV6(client._socket.remoteAddress);

		// data.message = 'broadcast! ' + data.message + "(" + this.count + ")";

		return data;
	}

}

module.exports = SocketResponder;


