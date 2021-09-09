import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {PasswordComponent} from './password.component';
import {PasswordService} from './password.service';

@NgModule({
  declarations: [
	  PasswordComponent
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
		PasswordComponent
	],
	providers: [
		PasswordService
	]
})
export class PasswordModule { }
