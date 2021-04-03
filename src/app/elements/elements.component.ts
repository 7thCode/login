import {Component, OnInit} from '@angular/core';
import {ElementsService} from './elements.service';

@Component({
	selector: 'app-elements',
	templateUrl: './elements.component.html',
	styleUrls: ['./elements.component.css']
})

// user1 -> user2
// user3...

export class ElementsComponent implements OnInit {

	public elements: any[];
	public message: string;		// メッセージ

	constructor(public elementsService: ElementsService) {
		this.elements = [];
		this.message = "";
	}

	public ngOnInit(): void {
		this.onDraw();
	}


	/*
	*　Draw
	*/
	public onDraw(): void {
		this.elementsService.query((network_error: any, container:  {error:any, result: any}): void => {
			this.elements = [];
			if (!network_error) {
				if (!container.error) {
					this.elements = container.result;
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}

	/*
	*
	*/
	public onDelete(id: string): void {
		this.elementsService.delete(id, (network_error: any, container: {error:any, result: any}): void => {
			if (!network_error) {
				if (!container.error) {
					this.onDraw();
				} else {
					this.message = container.error.message;
				}
			} else {
				this.message = network_error.message;
			}
		});
	}
}

import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ChangeDetectionStrategy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

export class MyDataSource extends DataSource<string | undefined> {
	private _length = 100000;
	private _pageSize = 100;
	private _cachedData = Array.from<string>({length: this._length});
	private _fetchedPages = new Set<number>();
	private _dataStream = new BehaviorSubject<(string | undefined)[]>(this._cachedData);
	private _subscription = new Subscription();

	connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
		this._subscription.add(collectionViewer.viewChange.subscribe(range => {
			const startPage = this._getPageForIndex(range.start);
			const endPage = this._getPageForIndex(range.end - 1);
			for (let i = startPage; i <= endPage; i++) {
				this._fetchPage(i);
			}
		}));
		return this._dataStream;
	}

	disconnect(): void {
		this._subscription.unsubscribe();
	}

	private _getPageForIndex(index: number): number {
		return Math.floor(index / this._pageSize);
	}

	private _fetchPage(page: number) {
		if (!this._fetchedPages.has(page)) {
			this._fetchedPages.add(page);
			setTimeout(() => {
				this._cachedData.splice(page * this._pageSize, this._pageSize,
					...Array.from({length: this._pageSize})
						.map((_, i) => `Item #${page * this._pageSize + i}`));
				this._dataStream.next(this._cachedData);
			}, Math.random() * 1000 + 200);
		}
	}
}
