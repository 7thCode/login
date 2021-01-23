import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import { AuthService } from './app.service';
import { TweetService } from './tweet/tweet.service';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
	declarations: [
		AppComponent,
		TweetComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		HttpClientModule,
		FormsModule,

		AppRoutingModule,
	],
	providers: [AuthService,TweetService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
