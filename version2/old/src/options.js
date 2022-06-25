// import { createClient } from "./supabase.js";

// const supabaseUrl = "https://upfqpckjqvwimvmxbfcj.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZnFwY2tqcXZ3aW12bXhiZmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI2Njc4MzgsImV4cCI6MTk2ODI0MzgzOH0.6BGIVfQNuab30tydBqTlBdm0kuMNk2pf0M29PE5ZdQQ";
// const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
const res = fetch("https://cdn.jsdelivr.net/npm/@supabase/supabase-js");
console.log(res.text);
let userForm = document.getElementById("userForm");
let userId = document.getElementById("userId");

userForm.addEventListener("submit", (event) => {
  console.log(userId.value);
});

// const handleLogin = async (event) => {
//   try {
//     setLoading(true);
//     const { error } = await supabaseClient.auth.signIn({
//       email,
//       password,
//     });

//     if (error) {
//       throw error;
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };
