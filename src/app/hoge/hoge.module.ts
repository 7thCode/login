import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HogeComponent} from './hoge.component';

@NgModule({
	declarations: [HogeComponent],
	imports: [
		CommonModule
	],
	exports: [
		HogeComponent
	]
})

export class HogeModule {
}
