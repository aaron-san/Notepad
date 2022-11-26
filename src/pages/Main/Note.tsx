import React from "react";
import { INote } from "../../App";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

interface Props {
  note: INote;
  notesList: INote[];
  setNotesList: (arg: INote[]) => void;
}

export const Note = (props: Props) => {
  const { note, notesList, setNotesList } = props;

  // const navigate = useNavigate();

  // const noteRef = collection(db, "notes");

  const onDelete = async (id: string) => {
    const noteDoc = doc(db, "notes", id);

    await deleteDoc(noteDoc);
    // navigate("/notepad");
    setNotesList(notesList.filter((note) => note.id !== id));
  };

  return (
    <div className="w-[93%] p-4 bg-slate-200 sm:w-80 rounded-md shadow-xl text-slate-600">
      <div className="flex  justify-between p-2 rounded-tr-[20px] text-xl">
        <h1 className="font-[ScopeOne-Regular]">{note.title}</h1>
        <button
          className="shadow transform transition ease-in duration-200 text-red-300 px-2 text-sm font-medium border-red-300 rounded-full border border-gray-500 hover:bg-slate-100 hover:text-red-600 hover:shadow-xl"
          onClick={() => {
            onDelete(note.id);
          }}
        >
          X
        </button>
      </div>
      <div className="border-t border-white p-2 rounded-br-[6px]] rounded-bl-[6px] text-slate-600">
        <p>{note.content}</p>
        <br />
        <p className="text-sm">
          @{note.username.substring(0, 10).concat("...")}
        </p>
      </div>
    </div>
  );
};
