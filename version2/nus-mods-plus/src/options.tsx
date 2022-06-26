import { supabase } from "./supabaseClient";
import "./options.css";

function OptionsIndex() {
  const user = supabase.auth.user();
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      window.location.reload();
    }
  };
  return (
    <div className="container">
      <div className="row">
        <h1>
          NUSMods Plus
          <br />
          <small>An extension for saving session data</small>
        </h1>
        <p className="lead">
          A Chrome extension for saving session data on{" "}
          <a href="https://nusmods.com/" target="_blank">
            https://nusmods.com/
          </a>
          . Take your module timetable that you spent so long optimising with
          you on any Chrome browser. Simple save and load the session data which
          will be synced using your your NUSNET ID.
        </p>
      </div>
      <div className="row">
        {user ? (
          <>
            <h3>You are current signed in as {user.email}</h3>
            <button className="btn btn-primary btn-lg" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <h3>You are not signed in.</h3>
        )}
      </div>
      <div className="row">
        <a href="https://github.com/danielk0k/NUSMods-Plus/" target="_blank">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
        </a>
        <p className="notice">
          Notice: The extension is currently under development and maybe buggy
          at times. But if you like the idea and want to contribute, do hit me
          up!
        </p>
      </div>
    </div>
  );
}

export default OptionsIndex;
