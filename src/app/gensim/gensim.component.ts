import {Component, OnInit} from '@angular/core';
import {GensimService} from './gensim.service';

@Component({
	selector: 'app-gensim',
	templateUrl: './gensim.component.html',
	styleUrls: ['./gensim.component.css']
})
export class GensimComponent implements OnInit {
	public words: string[] = [];
	public error: string = "";

	public positive: string = "";
	public negative: string = "";

	constructor(
		public gensim:GensimService
	) {
	}

	public ngOnInit(): void {

	}

	public similar() {
		if (this.positive) {
			this.gensim.similar(this.positive, this.negative).then((results: string[]) => {
				this.words = results;
			}).catch((error) => {
				this.error = error.message;
			})
		}

	}

}
