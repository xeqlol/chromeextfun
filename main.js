/// <reference path="node_modules/@types/chrome/index.d.ts"/>
chrome.browserAction.setBadgeBackgroundColor({ color: [100, 100, 100, 225] });
var requests = {};
chrome.browserAction.setTitle({ title: "0 requests in total" });
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    if (details.type.toString() == "xmlhttprequest") {
        chrome.tabs.get(details.tabId, function (tab) {
            var totalCount = 0;
            chrome.browserAction.getTitle({ tabId: tab.id }, function (text) { totalCount = text.split(' ')[0] != "" ? +text.split(' ')[0] : 0; });
            chrome.browserAction.getBadgeText({ tabId: tab.id }, function (text) {
                var count = text != "" ? +text : 0;
                if (text != "99+" && count <= 99) {
                    chrome.browserAction.setBadgeText({ tabId: tab.id, text: (++count).toString() });
                }
                else {
                    chrome.browserAction.setBadgeText({ tabId: tab.id, text: "99+" });
                    chrome.browserAction.setBadgeText({ tabId: tab.id, text: "99+" });
                }
                chrome.browserAction.setTitle({ tabId: tab.id, title: (++totalCount).toString() + " requests in total" });
            });
        });
    }
}, { urls: ["<all_urls>"] }, ["blocking"]);
