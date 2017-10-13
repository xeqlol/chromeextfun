/// <reference path="node_modules/@types/chrome/index.d.ts"/>

interface Traffic {
	tabId: number,
	totralTraffic: number;
}

var requests: Traffic[] = [];

chrome.browserAction.setBadgeBackgroundColor({color: [100, 100, 100, 225]});

chrome.webRequest.onResponseStarted.addListener((details) => {
	chrome.tabs.get(details.tabId, (tab) => {
		if(requests.findIndex(x => x.tabId == tab.id) == -1) {
			requests.push({tabId: tab.id, totralTraffic: 0});
		}
		var index: number = requests.findIndex(x => x.tabId == tab.id);
		for (var i = 0; i < details.responseHeaders.length; ++i) {
			if (details.responseHeaders[i].name.toLowerCase() == "content-length") {
				requests[index].totralTraffic += (+details.responseHeaders[i].value);

				var sizes: string[] = ["b", "k", "m", "g", "t", "umad"];
				var order: number = 0;
				var length: number = requests[index].totralTraffic;
				
				while(length >= 1024 && order < sizes.length - 1) {
					order++;
					length /= 1024;
				} 

				var formatedLength: number = length < 10 ? roundUp(length, 10) : roundUp(length, 1);

				chrome.browserAction.setBadgeText({tabId: tab.id, text: formatedLength + "" + sizes[order]});
				if(order == 5) {
					chrome.browserAction.setTitle({tabId: tab.id, title: "staph bruh, u r totally mad"});
				}
				chrome.browserAction.setTitle({tabId: tab.id, title: roundUp(length, 100) + sizes[order].toUpperCase() + "b in total"});
			}
		}
	});
}, {urls: ["<all_urls>"]}, ["responseHeaders"]);

function roundUp(num, precision): number {
	return Math.ceil(num * precision) / precision;
}
