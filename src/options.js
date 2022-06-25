import { createClient } from "supabase";

const public_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZnFwY2tqcXZ3aW12bXhiZmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI2Njc4MzgsImV4cCI6MTk2ODI0MzgzOH0.6BGIVfQNuab30tydBqTlBdm0kuMNk2pf0M29PE5ZdQQ";
const supabase = createClient(
  "https://upfqpckjqvwimvmxbfcj.supabase.co",
  public_key
);

let googleAuth = document.getElementById("googleAuth");
googleAuth.addEventListener("click", signInWithGoogle);

async function signInWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google",
  });
}
