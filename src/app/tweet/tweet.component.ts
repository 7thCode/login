import { Component, OnInit } from '@angular/core';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})

export class TweetComponent implements OnInit {

	public tweetText: string;
	public tweets: any[];
	public message: string;		// メッセージ

  	constructor(public tweet: TweetService) {

	}

  	public ngOnInit(): void {
		this.onDraw();
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
