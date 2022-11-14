import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };
  return (
    <div className="text-gray-100 m-6 text-center">
      <p>Sign in with Google to continue</p>
      <button
        onClick={signInWithGoogle}
        className="bg-white m-3 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
