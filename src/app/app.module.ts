import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import {AppRoutingModule} from './app-routing.module';

import {TweetModule} from './tweet/tweet.module';

import {AuthService} from './app.service';

import {AppComponent} from './app.component';
import { ChartComponent } from './chart/chart.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {SitesModule} from './sites/sites.module';
import {ElementsModule} from './elements/elements.module';

import {SocketModule} from './socket/socket.module';

import { SocketComponent } from './socket/socket.component';

@NgModule({
	declarations: [
		AppComponent,
		ChartComponent,
		SocketComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		HttpClientModule,
		FormsModule,

		FlexLayoutModule,

		TweetModule,
		SitesModule,
		ElementsModule,
		SocketModule,

		AppRoutingModule,

		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatSidenavModule,
		NgxChartsModule
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
