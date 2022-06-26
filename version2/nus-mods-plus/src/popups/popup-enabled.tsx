import { useState } from "react";
import { getData, setData, resetData } from "../api";
import { supabase } from "../supabaseClient";

function EnabledPopup() {
  const [loading, setLoading] = useState(false);
  const user = supabase.auth.user();

  const handleSave = async () => {
    try {
      setLoading(true);
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          world: "MAIN",
          func: getData,
        },
        async (injectionResults) => {
          for (const frameResult of injectionResults) {
            if (!frameResult.result) {
              throw new Error("No timetable data was found.");
            } else {
              const updates = {
                id: user.id,
                timetable_data: frameResult.result,
                updated_at: new Date(),
              };

              const { error } = await supabase
                .from("nusmods")
                .upsert(updates, { returning: "minimal" });

              if (error) {
                throw error;
              }
            }
          }
        }
      );
      console.log("Saved ok.");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("nusmods")
        .select("timetable_data")
        .single();

      if (error && status !== 406) {
        throw error;
      }

      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: setData,
        args: [data.timetable_data],
      });
      console.log("Loaded ok");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: resetData,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        id="saveButton"
        type="button"
        className="btn btn-default btn-block"
        title="Save session data"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        id="loadButton"
        type="button"
        className="btn btn-default btn-block"
        title="Load session data"
        onClick={handleLoad}
      >
        Load
      </button>
      <button
        id="resetButton"
        type="button"
        className="btn btn-danger btn-block"
        title="Reset session data"
        onClick={handleReset}
      >
        Nuke
      </button>
    </div>
  );
}

export default EnabledPopup;
