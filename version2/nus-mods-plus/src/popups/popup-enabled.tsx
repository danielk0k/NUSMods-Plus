import { useState } from "react";
import { saveData, loadData, resetData } from "../api";

function EnabledPopup() {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSave = async () => {
    setIsDisabled(true);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: saveData,
    });
    setIsDisabled(false);
  };
  const handleLoad = async () => {
    setIsDisabled(true);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: loadData,
    });
    setIsDisabled(false);
  };
  const handleReset = async () => {
    setIsDisabled(true);
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: resetData,
    });
    setIsDisabled(false);
  };
  return (
    <div>
      <button onClick={handleSave} disabled={isDisabled}>
        Save
      </button>
      <button onClick={handleLoad} disabled={isDisabled}>
        Load
      </button>
      <button onClick={handleReset} disabled={isDisabled}>
        Nuke
      </button>
    </div>
  );
}

export default EnabledPopup;
