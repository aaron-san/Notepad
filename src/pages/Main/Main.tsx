import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Note from "./Note";
import { INote } from "../../App";

interface Props {
  notesList: INote[] | null;
  setNotesList: (arg: INote[]) => void;
}

const defaultData: INote[] = [
  {
    userId: "John Doe",
    username: "John",
    id: "sdf4were3sgf9483884",
    title: "Get Groceries",
    content: "Go to Safeway after work",
    isImportant: false,
  },
];

export const Main = (props: Props) => {
  const notesList = props.notesList;
  const setNotesList = props.setNotesList;

  const notesRef = collection(db, "notes");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await getDocs(notesRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as INote[];
        setNotesList(filteredData);

        // .....................
        //  Trying to update all firestore documents to have an "isImportant" field with value "false"
        // .....................

        // getDocs(notesRef).then((querySnapshot) => {
        //   querySnapshot.forEach(async (doc: any) => {
        //     await db
        //       .collection("notes")
        //       .doc(doc.id)
        //       .set({ isImportant: false }, { merge: true });
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //   });
        // });
      } catch (err) {
        console.error(err);
        setNotesList(defaultData);
      }
    };
    getNotes();
  }, []);

  return (
    <div className="text-white flex flex-column justify-center md:flex-row md:justify-start flex-col mx-auto align-center md:flex-row flex-wrap mx-0 md:mx-60 pt-[80px] gap-7 overflow-clip max-w-[95%] md:max-w-full">
      {notesList?.map((note) => (
        <Note
          note={note}
          key={note.id}
          notesList={notesList}
          setNotesList={setNotesList}
        />
      ))}
    </div>
  );
};

export default Main;
