const https = require('https');
require('jsdom-global')();


const url = 'https://www.nikkei.com/nkd/company/?scode=4755';

https.get(url, (response) => {

	let html_page = '';

	response.on('data', (line) => {
		html_page += line;
	});

	response.on('end', () => {

		document.body.innerHTML = html_page;


		const elements = document.evaluate(
			"/html/body/div[2]/div/div[7]/div/div/div/div[1]/div[4]/dl[1]/dd/text()",
			document,					// root
			null,				// namespace
			XPathResult.ORDERED_NODE_ITERATOR_TYPE		//
		);

		let element = elements.iterateNext();
		let index = 1;
		while (element) {
			console.log("---------------------------- " + index +  " ----------------------------------");
			console.log(element.textContent);
			element = elements.iterateNext();
			index++;
		}

	});
});
