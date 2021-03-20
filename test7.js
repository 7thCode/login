const https = require('https');
require('jsdom-global')();

const url = 'https://www.nikkei.com/nkd/company/?scode=4755';

https.get(url, (response) => {

	let html_page = '';

	response.on('data', (line) => {
		html_page += line;
	});

	response.on('end', () => {
	 	console.log(new Date());
		for (index = 0; index < 100 ; index++) {
			document.body.innerHTML = html_page;
			const element = document.evaluate("/html/body/div[2]/div/div[7]/div/div/div/div[1]/div[4]/dl[1]/dd/text()", document, null, XPathResult.STRING_TYPE);
		}
	 	console.log(new Date());
	});
});
