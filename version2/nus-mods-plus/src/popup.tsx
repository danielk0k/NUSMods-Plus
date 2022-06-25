import { supabase } from "./supabaseClient";
import DisabledPopup from "./popups/popup-disabled";
import SigninPopup from "./popups/popup-signin";

function IndexPopup() {
  const session = supabase.auth.session();
  return (
    <div>
      <h3>NUSMods Plus</h3>
      <p>An extension for saving session data</p>
      {session ? <DisabledPopup /> : <SigninPopup />}
    </div>
  );
}

export default IndexPopup;
