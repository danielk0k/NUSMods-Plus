let saveButton = document.getElementById("saveButton");
let loadButton = document.getElementById("loadButton");
let resetButton = document.getElementById("resetButton");

saveButton.addEventListener("click", async () => {
  disableButtons();
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: saveData,
  });
  enableButtons();
});

loadButton.addEventListener("click", async () => {
  disableButtons();
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: loadData,
  });
  enableButtons();
});

resetButton.addEventListener("click", async () => {
  disableButtons();
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: resetData,
  });
  enableButtons();
});

function disableButtons() {
  saveButton.setAttribute("disabled", true);
  loadButton.setAttribute("disabled", true);
  resetButton.setAttribute("disabled", true);
}

function enableButtons() {
  saveButton.removeAttribute("disabled");
  loadButton.removeAttribute("disabled");
  resetButton.removeAttribute("disabled");
}

// API for storing and accessing data from user google
// account that is synced with their chrome browser.

function saveData() {
  try {
    const data = window.localStorage.getItem("persist:timetables");
    if (!data) {
      throw new Error("Timetable data could not be found.");
    }
    chrome.storage.sync.set({ nusmods_timetables: data });
    console.log("Successfully saved data.");
  } catch (error) {
    console.log(error.message);
  }
}

function loadData() {
  try {
    chrome.storage.sync.get(["nusmods_timetables"], (result) =>
      window.localStorage.setItem(
        "persist:timetables",
        result.nusmods_timetables
      )
    );
    window.location.reload();
    console.log("Successfully loaded data.");
  } catch (error) {
    console.log(error.message);
  }
}

function resetData() {
  try {
    window.localStorage.clear();
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
