import { useState } from "react";
import { supabase } from "../supabaseClient";
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
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <button onClick={handleSignOut}>Sign Out</button>
      {isDisabled ? (
        <p className="lead">
          NUSMods Plus works only on
          <a href="https://nusmods.com/" target="_blank">
            nusmods.com
          </a>
        </p>
      ) : (
        <EnabledPopup />
      )}
    </>
  );
}

function isURLNUSMods(url: string) {
  const regex = new RegExp(String.raw`(https\:\/\/nusmods\.com.)`);
  return regex.test(url);
}

export default DisabledPopup;
