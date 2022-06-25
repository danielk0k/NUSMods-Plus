// API for storing and accessing timetable data
import { supabase } from "./supabaseClient";

const user = supabase.auth.user();

async function saveData() {
  try {
    const data = window.localStorage.getItem("persist:timetables");
    if (!data) {
      throw new Error("Timetable data could not be found.");
    }
    const updates = {
      id: user.id,
      timetable: data,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("profiles")
      .upsert(updates, { returning: "minimal" });

    if (error) {
      throw error;
    }
    console.log("Successfully saved data.");
  } catch (error) {
    console.log(error.message);
  }
}

async function loadData() {
  try {
    const { data, error, status } = await supabaseClient
      .from("nusmods")
      .select("timetable")
      .single();

    if (error && status !== 406) {
      throw error;
    }

    window.localStorage.setItem("persist:timetables", data.timetable);
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

export { saveData, loadData, resetData };
