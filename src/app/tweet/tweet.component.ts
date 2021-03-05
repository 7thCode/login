import { Component, OnInit } from '@angular/core';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})

// user1 -> user2
// user3...

export class TweetComponent implements OnInit {

	public tweetText: string;
	public friend_tweets: any[];
	public self_tweets: any[];
	public message: string;		// メッセージ
	public username: string;

  	constructor(public tweet: TweetService) {

	}

  	public ngOnInit(): void {
		this.onDraw(-1);
  	}

  	/*
	*　Tweet
	*/
	public onTweet(): void {
		this.tweet.tweet({text:this.tweetText},(error: any, result: any): void => {
			if (!error) {
				this.onDraw(-1);
			} else {
				this.message = error.message;
			}
		});
	}

	/*
	*　Draw
	*/
	public onDraw(direction: number): void {
		this.tweet.friend_tweets({sort:{create: direction}}, (error: any, friend_tweets: any): void => {
			if (!error) {
				this.tweet.self_tweets({sort:{create: direction}}, (error: any, self_tweets: any): void => {
					if (!error) {
						this.friend_tweets = friend_tweets.value;
						this.self_tweets = self_tweets.value;
					} else {
						this.message = error.message;
					}
				});
			} else {
				this.message = error.message;
			}
		});
	}

	/*
	*　Sort
	*/
	public Ascend(): void {
		this.onDraw(-1);
	}

	public Descend(): void {
		this.onDraw(1);
	}

	public Relation(): void {
		this.tweet.relation({to: this.username,type: "friend"}, (error: any, tweets: any): void => {
			if (!error) {
				this.onDraw(-1);
			} else {
				this.message = error.message;
			}
		});
	}

}
