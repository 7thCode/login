import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';

import {BinanceComponent} from "./binance.component";

@NgModule({
	declarations: [BinanceComponent],
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,

		FlexLayoutModule,

		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
	],
	exports: [
		BinanceComponent,
	],
})

export class BinanceModule {
}
