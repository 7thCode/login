import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {TweetComponent} from './tweet/tweet.component';
import {ChartComponent} from './chart/chart.component';
import {SitesComponent} from './sites/sites.component';
import {ElementsComponent} from './elements/elements.component';
// import {SocketComponent} from './socket/socket.component';
import {BinanceComponent} from './binance/binance.component';

const routes: Routes = [
	{path: "tweet", component: TweetComponent},
	{path: "chart", component: ChartComponent},
	{path: "sites", component: SitesComponent},
	// {path: "socket", component: SocketComponent},
	{path: "binance", component: BinanceComponent},
	{path: "elements", component: ElementsComponent},
	{path: '', component: TweetComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {
}
