import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import FormModal from "./FormModal";
import { BsPlusCircleDotted } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  const [showModal, setShowModal] = useState(false);

  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-[100]">
      <div className="md:flex items-center justify-between bg-slate-600 text-white text-3xl md:px-10 px-7 py-3 flex border-b-2 border-white">
        <Link to="/notepad">Notepad</Link>
        <div className="flex text-xl text-gray-200">
          <div
            onClick={() => setOpen(!open)}
            className={`text-2xl absolute right-8 top-6 cursor-pointer md:hidden ${
              open ? "text-white" : "text-white"
            } z-[100]`}
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pt-5 pb-12 absolute md:static bg-slate-200 md:z-auto z-[10] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in text-slate-500 ${
              open ? "top-[63px]" : "top-[-490px]"
            }`}
          >
            {!user ? (
              <Link to="/notepad/login" className="p-2 hover:text-green-200">
                Login
              </Link>
            ) : (
              // <Link to="/add-note" className="p-2 hover:text-green-200">
              <button
                className="px-3 py-1.5 mb-4 hover:text-green-200 mr-1 flex gap-2 items-center border border-slate-500 rounded-xl bg-green-500 text-white hover:bg-green-400 hover:text-white"
                onClick={() => setShowModal(true)}
              >
                <BsPlusCircleDotted />
                <p>Add note</p>
              </button>
              // </Link>
            )}

            <div>
              {user && (
                <>
                  <div className="mx-3 flex items-center">
                    <p className="hidden lg:text-sm">{user?.displayName}</p>
                    <img
                      className="mx-0 rounded-sm "
                      src={user?.photoURL || ""}
                      width="30"
                      height="30"
                      alt=""
                    />
                    <button
                      onClick={signUserOut}
                      className="mr-3 p-2 hover:text-green-200"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
      {showModal && <FormModal setShowModal={setShowModal} />}
    </div>
  );
}

export default Navbar;
