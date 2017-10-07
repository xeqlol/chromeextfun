/// <reference path="node_modules/@types/chrome/index.d.ts"/>

interface Traffic {
	tabId: number,
	totralTraffic: number;
}

var requests: Traffic[] = [];

chrome.browserAction.setBadgeBackgroundColor({color: [100, 100, 100, 225]});

chrome.webRequest.onHeadersReceived.addListener((details) => {
	//if(details.method == "HEAD") {
	{chrome.tabs.get(details.tabId, (tab) => {
		if(requests.findIndex(x => x.tabId == tab.id) == -1) {
			requests.push({tabId: tab.id, totralTraffic: 0});
		}
		var index: number = requests.findIndex(x => x.tabId == tab.id);
		console.log("ADKL:SADKJDSKAL:DKSLA");
		/*
		requests[index].totralTraffic += (+details.responseHeaders.find(x => x.name == "Content-Length")[0].value);
		var sizes: string[] = ["b", "kb", "mb", "gb", "tb"];
		var order: number = 0;
		var length: number = requests[index].totralTraffic;
		while(length >= 1024 && order < sizes.length - 1) {
			order++;
			length /= 1024;
		} 

		chrome.browserAction.setBadgeText({tabId: tab.id, text: length + "" + sizes[order]});
		//chrome.browserAction.setBadgeText({tabId: tab.id, text: "99+"});chrome.browserAction.setBadgeText({tabId: tab.id, text: "99+"});
		//chrome.browserAction.setTitle({tabId: tab.id, title: (++totalCount).toString() + " requests in total"})
		*/
	});
}
}, {urls: ["http://*/*"]},["blocking", "responseHeaders"]);