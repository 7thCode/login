const https = require('https');
const libxmljs = require("libxmljs");

const url = 'https://www.nikkei.com/nkd/company/?scode=4755';

https.get(url, (response) => {

	let html_page = '';

	response.on('data', (line) => {
		html_page += line;
	});
// 			"/html/body/div[2]/div/div[7]/div/div/div/div[1]/div[4]/dl[1]/dd/text()",
	response.on('end', () => {
		const dom = libxmljs.parseHtml(html_page);
		const element = dom.get('/html/body/div[2]/div/div[7]/div/div/div/div[1]/div[4]');

		const c = element.childNodes();
		const d = c[1].childNodes();
		const e = d[1].childNodes();

		console.log(e[0].text());

	//	d.forEach((e) => {
	//		console.log(e.text());
	//	})



	});
});
