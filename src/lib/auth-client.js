import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
 
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000", 
});

export const {
  signIn,
  signUp,
  useSession,
  signOut
} = authClient;

// import { createAuthClient } from "better-auth/react";


// const getBaseURL = () => {

//   if (typeof window !== "undefined" && window.location.origin.includes("vercel.app")) {
//     return window.location.origin;
//   }
  
//   return "http://localhost:3000";
// };

// export const authClient = createAuthClient({
//   baseURL: getBaseURL(),
// });

// export const {
//   signIn,
//   signUp,
//   useSession,
//   signOut
// } = authClient;