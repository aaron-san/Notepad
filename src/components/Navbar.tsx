import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
// import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import FormModal from "./FormModal";
import { BsPlusCircleDotted } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { INote } from "../App";
import Login from "../pages/Login";

interface Props {
  notesList: INote[] | null;
  setNotesList: (arg: INote[]) => void;
}

function Navbar(props: Props) {
  const notesList = props.notesList;
  const setNotesList = props.setNotesList;
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await auth.signOut();
    window.location.href = "/notepad";
  };

  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  return (
    <div className="shadow-sm w-full fixed top-0 left-0 z-[100]">
      <div className="flex items-center justify-between bg-slate-200 text-slate-700 sm:text-md md:text-3xl px-3 md:px-10">
        <Link
          to="/notepad"
          className="font-[Trykker-Regular] text-lg md:text-4xl tracking-wider"
        >
          <span className="text-2xl">N</span>
          <span className="text-l">OTEPAD</span>
        </Link>
        {/* <div className="h-[20px] md:h-[40px] flex gap-6 md:gap-0"> */}
        <div className="flex justify-end gap-1 py-2">
          {!user ? (
            <Login />
          ) : (
            // <Link to="/add-note" className="p-2 hover:text-green-200">

            <button
              className="px-2 py-1 hover:text-green-200 mr-1 flex items-center gap-2 border border-slate-500 rounded-xl bg-green-300 text-white hover:bg-green-400 hover:text-white"
              onClick={() => setShowModal(true)}
            >
              <BsPlusCircleDotted className="text-slate-700 text-xl" />
              <p className="hidden md:inline-flex">Add</p>
            </button>

            // </Link>
          )}
          {/* </div> */}

          {/* <div> */}
          {user && (
            <>
              {/* <p className="hidden lg:inline-flex items-center text-sm">
                {user?.displayName}
              </p> */}
              {/* <img
                className="hidden md:flex mx-0 rounded-sm "
                src={user?.photoURL || ""}
                width="30"
                height="30"
                alt=""
              /> */}
              <button
                onClick={signUserOut}
                className="text-sm md:text-lg ml-1 mr-1 p-2 border border-red-500 rounded-[12px] text-red-500 bg-red-200"
              >
                Sign Out
              </button>
            </>
          )}
          {/* </div> */}
        </div>
        {/* <div className="flex text-xl text-gray-200 justify-center items-center"> */}
        {/* <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`text-2xl absolute right-6 top-5 cursor-pointer md:hidden ${
              isMenuOpen ? "text-slate-100" : "text-slate-600"
            } z-[100]`}
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div> */}
        {/* <ul
            className={`md:pb-0 pb-12 absolute md:static bg-slate-500 md:bg-inherit md:z-auto z-[10] left-0 w-full md:w-auto md:pl-0 transition-all duration-300 ease-in text-slate-100 md:text-slate-700 ${
              isMenuOpen ? "top-0" : "top-[-490px]"
            }`}
          > */}

        {/* </ul> */}
        {/* </div> */}
      </div>
      {showModal && (
        <FormModal
          setShowModal={setShowModal}
          setIsMenuOpen={setIsMenuOpen}
          notesList={notesList}
          setNotesList={setNotesList}
        />
      )}
    </div>
  );
}

export default Navbar;
