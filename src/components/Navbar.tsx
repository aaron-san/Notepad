import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <div className="flex place-content-between items-center bg-slate-600 text-white text-3xl px-4 py-3 flex border-b-2 border-white">
      <Link to="/">Notepad</Link>
      <div className="flex text-xl text-gray-200">
        <Link to="/" className="p-2 hover:text-green-200">
          Home
        </Link>
        {!user && (
          <Link to="/login" className="p-2 hover:text-green-200">
            Login
          </Link>
        )}
        <div>
          {user && (
            <>
              <div className="mx-3 flex items-center">
                <p>{user?.displayName}</p>
                <img
                  className="mx-2 "
                  src={user?.photoURL || ""}
                  width="30"
                  height="30"
                  alt=""
                />
              </div>
              <button onClick={signUserOut} className="mr-3">
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

// .App-header {
//     background-color: #282c34;
//     height: 50px;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: space-between;
//     font-size: calc(10px + 2vmin);
//     color: white;
//     padding-left: 20px;
//   }
