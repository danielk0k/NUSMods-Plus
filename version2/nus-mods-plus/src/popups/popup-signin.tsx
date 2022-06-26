import { useState } from "react";
import { supabase } from "../supabaseClient";

function SigninPopup() {
  const [nusId, setNusId] = useState("");
  const handleAccount = async (event) => {
    event.preventDefault();
    try {
      const { user, error: SignInError } = await supabase.auth.signIn({
        email: `${nusId.toLowerCase()}@u.nus.edu`,
        password: `${nusId.toLowerCase()}`,
      });

      if (!user || SignInError) {
        const { error: SignUpError } = await supabase.auth.signUp({
          email: `${nusId.toLowerCase()}@u.nus.edu`,
          password: `${nusId.toLowerCase()}`,
        });
        if (SignUpError) {
          throw new Error("Something went wrong here");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleAccount}>
      <label>NUSNET ID: </label>
      <input
        type="text"
        onChange={(event) => setNusId(event.target.value)}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SigninPopup;
