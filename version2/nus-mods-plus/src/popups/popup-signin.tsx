import { useState } from "react";
import { supabase } from "../supabaseClient";

function SigninPopup() {
  const [nusId, setNusId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAccount = async (event) => {
    event.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleAccount}>
      <div className="form-group">
        <label htmlFor="nusnetId">NUSNET ID</label>
        <input
          type="text"
          className="form-control"
          id="nusnetId"
          disabled={loading}
          onChange={(event) => setNusId(event.target.value)}
        />
        <small id="nusnetHelp" className="form-text text-muted">
          You'll not receive any email from us.
        </small>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
}

export default SigninPopup;
