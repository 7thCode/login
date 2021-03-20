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
		const dom = new JSDOM(html_page);
		const document = dom.window.document;
		const element = document.evaluate("/html/body/div[2]/div/div[7]/div/div/div/div[1]/div[4]/dl[1]/dd/text()", document, null, 2);
		console.log(element.stringValue);
	});
});
