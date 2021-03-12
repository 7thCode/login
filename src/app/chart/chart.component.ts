import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

public data = [
	{
		"name": "Tajikistan",
		"series": [
			{
				"value": 3872,
				"name": "2016-09-15T21:59:36.207Z"
			},
			{
				"value": 6326,
				"name": "2016-09-13T00:18:02.880Z"
			},
			{
				"value": 3920,
				"name": "2016-09-20T21:39:34.545Z"
			},
			{
				"value": 2255,
				"name": "2016-09-14T23:07:06.463Z"
			},
			{
				"value": 3973,
				"name": "2016-09-22T01:49:27.015Z"
			}
		]
	},
	{
		"name": "Andorra",
		"series": [
			{
				"value": 5442,
				"name": "2016-09-15T21:59:36.207Z"
			},
			{
				"value": 2956,
				"name": "2016-09-13T00:18:02.880Z"
			},
			{
				"value": 6018,
				"name": "2016-09-20T21:39:34.545Z"
			},
			{
				"value": 3471,
				"name": "2016-09-14T23:07:06.463Z"
			},
			{
				"value": 2670,
				"name": "2016-09-22T01:49:27.015Z"
			}
		]
	},
	{
		"name": "Suriname",
		"series": [
			{
				"value": 5028,
				"name": "2016-09-15T21:59:36.207Z"
			},
			{
				"value": 5663,
				"name": "2016-09-13T00:18:02.880Z"
			},
			{
				"value": 4197,
				"name": "2016-09-20T21:39:34.545Z"
			},
			{
				"value": 2879,
				"name": "2016-09-14T23:07:06.463Z"
			},
			{
				"value": 4023,
				"name": "2016-09-22T01:49:27.015Z"
			}
		]
	},
	{
		"name": "Latvia",
		"series": [
			{
				"value": 3690,
				"name": "2016-09-15T21:59:36.207Z"
			},
			{
				"value": 2921,
				"name": "2016-09-13T00:18:02.880Z"
			},
			{
				"value": 5810,
				"name": "2016-09-20T21:39:34.545Z"
			},
			{
				"value": 4941,
				"name": "2016-09-14T23:07:06.463Z"
			},
			{
				"value": 3101,
				"name": "2016-09-22T01:49:27.015Z"
			}
		]
	},
	{
		"name": "Tanzania",
		"series": [
			{
				"value": 6681,
				"name": "2016-09-15T21:59:36.207Z"
			},
			{
				"value": 6913,
				"name": "2016-09-13T00:18:02.880Z"
			},
			{
				"value": 5937,
				"name": "2016-09-20T21:39:34.545Z"
			},
			{
				"value": 3659,
				"name": "2016-09-14T23:07:06.463Z"
			},
			{
				"value": 6953,
				"name": "2016-09-22T01:49:27.015Z"
			}
		]
	}
]
  constructor() { }

  ngOnInit(): void {
  }

}
