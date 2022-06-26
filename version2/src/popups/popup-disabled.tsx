import { useState } from "react";
import EnabledPopup from "./popup-enabled";

function DisabledPopup() {
  const [isDisabled, setIsDisabled] = useState(true);
  chrome.tabs.query({ active: true, currentWindow: true }, (result) => {
    if (isURLNUSMods(result[0].url)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  return (
    <div>
      {isDisabled ? (
        <p className="lead">
          NUSMods Plus works only on{" "}
          <a href="https://nusmods.com/" target="_blank">
            nusmods.com
          </a>
        </p>
      ) : (
        <EnabledPopup />
      )}
    </div>
  );
}

function isURLNUSMods(url: string) {
  const regex = new RegExp(String.raw`(https\:\/\/nusmods\.com.)`);
  return regex.test(url);
}

export default DisabledPopup;
