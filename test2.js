const https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const url = 'https://www.nikkei.com/nkd/company/?scode=4755';

https.get(url, (response) => {

	let html_page = '';

	response.on('data', (line) => {
		html_page += line;
	});

	response.on('end', () => {

		const dom = new JSDOM(html_page);       // server上でhtmlを扱うために。

		const document = dom.window.document;

		const element = document.evaluate(
			"/html",			// xpath
			document,			// root
			null,				// namespace
			XPathResult.STRING_TYPE		//
		);

		console.log(element.stringValue);
	});
});
