import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {AuthService} from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

	public user: any;

	public message: string;

	public username: string;
	public password: string;

	constructor(
		public changeDetectorRef: ChangeDetectorRef,
		public auth: AuthService) {
	}

	public ngOnInit(): void {
		this.isLogin();
	}

	public isLogin(): void {
		try {
			this.auth.user((error: any, result: any): void => {
				if (!error) {
					this.user = result;
				} else {
					this.user = null;
				}
			});
		} finally {
			this.changeDetectorRef.detectChanges();
		}
	}

	public onLogin(): void {
		this.auth.login(this.username, this.password, (error: any, result: any): void => {
			if (!error) {
				this.user = result;
				this.message = '';
			} else {
				this.message = error.message;
			}
			this.changeDetectorRef.detectChanges();
		});
	}

	public onLogout(): void {
		this.auth.logout((error: any, result: any): void => {
			if (!error) {
				this.user = null;
				this.message = '';
			} else {
				this.message = error.message;
			}
			this.changeDetectorRef.detectChanges();
		});
	}

	public onRegister(): void {
		this.auth.register(this.username, this.password, {},(error: any, result: any): void => {
			if (!error) {
				this.message = 'OK';
			} else {
				this.message = error.message;
			}
		});
	}

}
