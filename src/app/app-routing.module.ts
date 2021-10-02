import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {TweetComponent} from './tweet/tweet.component';
import {ChartComponent} from './chart/chart.component';
import {SitesComponent} from './sites/sites.component';
import {ElementsComponent} from './elements/elements.component';
import {BinanceComponent} from './binance/binance.component';
import {SampleComponent} from './sample/sample.component';
import {PasswordComponent} from './password/password.component';
import {GensimComponent} from './gensim/gensim.component';

const routes: Routes = [
	{path: "tweet", component: TweetComponent},
	{path: "chart", component: ChartComponent},
	{path: "sites", component: SitesComponent},
	{path: "binance", component: BinanceComponent},
	{path: "elements", component: ElementsComponent},
	{path: "sample", component: SampleComponent},
	{path: "password", component: PasswordComponent},
	{path: "gensim", component: GensimComponent},
	{path: '', component: TweetComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {
}
