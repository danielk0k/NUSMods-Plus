// Listen to URL changes on the active tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isURLNUSMods(changeInfo.url || tab.url)) {
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

function isURLNUSMods(url) {
  const regex = new RegExp(String.raw`(https\:\/\/nusmods\.com.)`);
  return regex.test(url);
}
