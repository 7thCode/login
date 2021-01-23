import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import { TweetModule } from './tweet/tweet.module';

import { AuthService } from './app.service';

import {AppComponent} from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		HttpClientModule,
		FormsModule,

		TweetModule,

		AppRoutingModule,
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
