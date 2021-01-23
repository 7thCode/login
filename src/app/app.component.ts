import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from './app.service';
import {TweetService} from './tweet.service';

/*
* コンポーネント定義
*/
@Component({selector: 'app-root',templateUrl: './app.component.html',styleUrls: ['./app.component.css']})
export class AppComponent implements OnInit {

	public tweetText: string;
	public tweets: any[];

	// バインド対象
	public user: any;			// ログインユーザ
	public message: string;		// メッセージ
	public username: string;	// ユーザ名
	public password: string;	// パスワード

	/*
	* コンストラクタ
	* AppComponentクラスがインスタンス化される際に最初に一回だけ実行される
	* */
	constructor(
		public changeDetectorRef: ChangeDetectorRef,
		public auth: AuthService,
		public tweet: TweetService) {
	}

	/*
	* AppComponentの初期化
	* コンポーネントの初期化時に実行される
	*/
	public ngOnInit(): void {
		this.isLogin();
		this.onDraw();
	}

	/*
	*　ログインしてる？
	*/
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

	/*
	*　ログイン
	*/
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

	/*
	*　ログアウト
	*/
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

	/*
	*　ユーザ登録
	*/
	public onRegister(): void {
		this.auth.register(this.username, this.password, {},(error: any, result: any): void => {
			if (!error) {
				this.message = 'OK';
			} else {
				this.message = error.message;
			}
		});
	}

	/*
	*　Tweet
	*/
	public onTweet(): void {
		this.tweet.tweet({text:this.tweetText},(error: any, result: any): void => {
			if (!error) {
				this.onDraw();
			} else {
				this.message = error.message;
			}
		});
	}

	/*
	*　Draw
	*/
	public onDraw(): void {
		this.tweet.tweets((error: any, tweets: any): void => {
			if (!error) {
				this.tweets = tweets.value;
			} else {
				this.message = error.message;
			}
		});
	}

}
