// Listen to URL changes on the active tab
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      chrome.action.setPopup({
        popup: "src/popup.html",
      });
    } else {
      chrome.action.setPopup({
        popup: "src/popup-disabled.html",
      });
    }
  });
});
