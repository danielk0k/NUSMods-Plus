import { supabase } from "./supabaseClient";
import DisabledPopup from "./popups/popup-disabled";
import SigninPopup from "./popups/popup-signin";

function IndexPopup() {
  const session = supabase.auth.session();
  return (
    <div
      className="container"
      style={{ minWidth: "300px", minHeight: "100px", padding: "10px" }}
    >
      <div className="mx-auto">
        <h4>
          NUSMods Plus
          <br />
          <small>An extension for saving session data</small>
        </h4>
      </div>
      <div className="mx-auto">
        {session ? <DisabledPopup /> : <SigninPopup />}
      </div>
    </div>
  );
}

export default IndexPopup;
