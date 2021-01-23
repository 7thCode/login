import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet.component';
import { TweetService } from './tweet.service';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [
		TweetComponent
	],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		TweetComponent
	],
	providers: [
		TweetService
	]
})

export class TweetModule { }
