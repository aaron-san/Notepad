import React from "react";
import { signInWithGoogle } from "../config/firebase";
// import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // const signInWithGoogle = async () => {
  //   // const result =
  //   const result = await signInWithPopup(auth, provider);
  //   // console.log(result);
  //   navigate("/notepad");
  // };

  return (
    <div className="text-gray-100 m-6 pt-[130px] text-center">
      <button
        onClick={() => {
          signInWithGoogle();
        }}
        className="text-gray-700 text-xl transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline divide-y divide-gray-200 bg-white m-3 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
