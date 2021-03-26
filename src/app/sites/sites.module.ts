import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {FlexLayoutModule} from '@angular/flex-layout';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {SitesService} from './sites.service';

import {SitesComponent} from './sites.component';

@NgModule({
	declarations: [
		SitesComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FlexLayoutModule,

		MatCardModule,
		MatListModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	exports: [
		SitesComponent
	],
	providers: [
		SitesService
	]
})

export class SitesModule {
}
