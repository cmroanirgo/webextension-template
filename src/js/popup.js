/**
 * popup.js
 * @license AGPL
 * Copyright (c) 2017 Craig Monro (cmroanirgo), kodespace.com. All rights reserved.
 **/

/*
* This file is used by popup.html
* popup.html is shown when the user clicks on the browser button in the toolbar
*/

const ext = require("./webext");
const $ = ext.$;
const storage = ext.storage;

/*
// Use the settings stored in options.html
storage.get('color', function(resp) {
	var color = resp.color;
	if(color) {
		document.body.style.backgroundColor = color;
	}
});
*/

// Get the current tab and request that it do something. Often, this might be in relation to a button-click/form submit
// ...but here it's done immediately
ext.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var activeTab = tabs[0];

	//chrome.tabs.sendMessage(activeTab.id, { action: 'page-fetchSomething' });

	// tell the current page to fetch something. (See page.js)
	chrome.tabs.sendMessage(activeTab.id, { action: 'page-fetchSomething' }, function (linksStr) { 
		// handle the response here... 
		//var links = JSON.parse(linksStr);
		console.log(linksStr);
		//alert(linksStr);
	} );

});


/*
// see background.js for pseudo-implementation
$("#some-btn").on("click", function(e) {
	e.preventDefault();
	ext.runtime.sendMessage({ action: "perform-someBtn-Action", data: data }, function(response) {
		if(response && response.action === "saved") {
			renderMessage("Your bookmark was saved successfully!");
		} else {
			renderMessage("Sorry, there was an error while saving your bookmark.");
		}
	})
});
*/

// show our plugin options
$("#options").on("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})


