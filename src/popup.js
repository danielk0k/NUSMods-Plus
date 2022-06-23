let saveButton = document.getElementById("saveButton");
let loadButton = document.getElementById("loadButton");
let resetButton = document.getElementById("resetButton");

saveButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: saveData,
  });
});

loadButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: loadData,
  });
});

resetButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: resetData,
  });
});

// API for storing and accessing data from user google
// account that is synced with their chrome browser.

function saveData() {
  try {
    const data = window.localStorage.getItem("persist:timetables");
    if (data) {
      throw new Error("Timetable data could not be found.");
    }
    chrome.storage.sync.set({ "nusmods-timetables": data });
  } catch (error) {
    console.log(error.message);
  }
}

function loadData() {
  try {
    chrome.storage.sync.get(["nusmods-timetables"], (result) =>
      window.localStorage.setItem("persist:timetables", result)
    );
  } catch (error) {
    console.log(error.message);
  }
}

function resetData() {
  try {
    window.localStorage.removeItem("persist:timetables");
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
