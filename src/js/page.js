/**
 * page.js
 * @license AGPL
 * Copyright (c) 2017 Craig Monro (cmroanirgo), kodespace.com. All rights reserved.
 **/

/*
 * This code is injected into each page instance. This is commonly called the 'contentscript'
 * Most of your code will exist in background.js
 * Keep this as lightweight and unobtrusive as possible
 */
(function() {

const ext = require("./webext");
const $ = ext.$;



function fetchSomething(fnSendResponse) {
	// This demo gets all the links on a page and returns the urls as a list

	var links = [];
	$('a[href]').each(function() {
		var url = $(this).attr('href');
		if (url!='#')
			links.push(url);
	});
	fnSendResponse(JSON.stringify(links)); // return all links in the page
}


// Listen to broadcast messages
ext.runtime.onMessage.addListener(function(request,sender, sendResponse) {
	switch (request.action) {
		case 'page-fetchSomething': // this is called from popup.js
			fetchSomething(sendResponse);
    		break;
  	}
});

})();
