import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Note } from "./Note";

export interface INote {
  id: string;
  userId: string;
  title: string;
  username: string;
  content: string;
}

export const Main = () => {
  const [notesList, setNotesList] = useState<INote[] | null>(null);
  const notesRef = collection(db, "notes");

  const getNotes = async () => {
    const data = await getDocs(notesRef);
    setNotesList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as INote[]
    );
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="text-white flex flex-wrap mx-0 md:mx-60 pt-[80px] gap-4 overflow-clip">
      {notesList?.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </div>
  );
};

export default Main;
