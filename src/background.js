// Listen to URL changes on the active tab
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      chrome.action.setPopup({
        tabId: tab.id,
        popup: "src/popup.html",
      });
    } else {
      chrome.action.setPopup({
        tabId: tab.id,
        popup: "src/popup-disabled.html",
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url) {
    chrome.action.setPopup({
      tabId: tabId,
      popup: "src/popup.html",
    });
  } else {
    chrome.action.setPopup({
      tabId: tabId,
      popup: "src/popup-disabled.html",
    });
  }
});
