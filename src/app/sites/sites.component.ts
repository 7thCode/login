import {Component, OnInit} from '@angular/core';
import {SitesService} from './sites.service';

@Component({
	selector: 'app-sites',
	templateUrl: './sites.component.html',
	styleUrls: ['./sites.component.css']
})

// user1 -> user2
// user3...

export class SitesComponent implements OnInit {

	public sites: any[];
	public message: string;		// メッセージ
	public path: string;

	public name: string;
	public url: string;
	public result: string;

	constructor(public sitesService: SitesService) {
		this.sites = [];
		this.message = "";

		this.name ="";
		this.url = "";
		this.result = "";
	}

	public ngOnInit(): void {
		this.onDraw();
	}

	/*
	*　Draw
	*/
	public onDraw(): void {
		this.sitesService.query((network_error: any, container:  {error:any, result: any}): void => {
			this.sites = [];
			if (!network_error) {
				if (!container.error) {
					this.sites = container.result;
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}

	/*
	*
	*/
	public onGet(id: string): void {
		this.sitesService.get(id, (network_error: any, container:  {error:any, result: any}): void => {
			this.name ="";
			this.url = "";
			this.path = "";
			if (!network_error) {
				if (!container.error) {
					const result = container.result;
					this.name = result.name;
					this.url = result.url;
					this.path = result.path;
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}

	/*
	*
	*/
	public onScrape(id: string): void {
		this.sitesService.scrape(id, (network_error: any, container: {error:any, result: any}): void => {
			this.result = "";
			if (!network_error) {
				if (!container.error) {
					this.result = container.result;
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}

	/*
	*
	*/
	public onCreate(name: string, url: string, path: string): void {
		this.sitesService.post({name: name, url: url, path: path}, (network_error: any, container: {error:any, result: any}): void => {
			if (!network_error) {
				if (!container.error) {
					this.onDraw();
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}

	/*
	*
	*/
	public onUpdate(id: string, name: string, url: string, path: string): void {
		this.sitesService.put(id, {name: name, url: url, path: path}, (network_error: any, container: {error:any, result: any}): void => {
			if (!network_error) {
				if (!container.error) {
					this.onDraw();
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}

	/*
	*
	*/
	public onDelete(id: string): void {
		this.sitesService.delete(id, (network_error: any, container: {error:any, result: any}): void => {
			if (!network_error) {
				if (!container.error) {
					this.onDraw();
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}

}
