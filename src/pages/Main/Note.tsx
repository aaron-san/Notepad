import React, { useState } from "react";
import { INote } from "../../App";
import { db } from "../../config/firebase";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";
// import EditModal from "../../components/EditModal";

interface Props {
  note: INote;
  notesList: INote[];
  setNotesList: (arg: INote[]) => void;
}

const Note = (props: Props) => {
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showContentInput, setShowContentInput] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const { note, notesList, setNotesList } = props;

  const navigate = useNavigate();

  // const noteRef = collection(db, "notes");

  const onDelete = async (id: string) => {
    const result = window.confirm("Delete?");
    if (result) {
      const noteDoc = doc(db, "notes", id);
      await deleteDoc(noteDoc);
      navigate("/notepad");
      setNotesList(notesList.filter((note) => note.id !== id));
    }
  };

  const updateTitle = async (id: string) => {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, {
      title: updatedTitle,
    });
    setShowTitleInput(false);

    const updatedNotesList = notesList.map((doc) => {
      if (doc.id === id) {
        const updatedNote = {
          ...doc,
          title: updatedTitle,
        };
        return updatedNote;
      }
      return doc;
    });
    setNotesList(updatedNotesList);
  };

  const updateContent = async (id: string) => {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, {
      content: updatedContent,
    });
    setShowContentInput(false);

    const updatedNotesList = notesList.map((doc) => {
      if (doc.id === id) {
        const updatedNote = {
          ...doc,
          content: updatedContent,
        };
        return updatedNote;
      }
      return doc;
    });
    setNotesList(updatedNotesList);
  };

  // const onEdit = async (id: string) => {
  //   // console.log(id);
  //   // const docRef = doc(db, "notes", id);
  //   // const docText = await getDoc(docRef);
  //   // console.log(docText.data);
  //   // navigate("/notepad");
  //   // setNotesList(notesList.filter((note) => note.id !== id));
  //   setShowEditInput(true);
  // };

  return (
    <div className="w-[93%] p-4 bg-slate-200 sm:w-85 rounded-md shadow-xl text-slate-600">
      <div className="flex justify-between p-2 rounded-tr-[20px] text-xl">
        <div className="title-container">
          {!showTitleInput && (
            <h1 className="font-[ScopeOne-Regular]">{note.title}</h1>
          )}
          {showTitleInput && (
            <div>
              <input
                className="title-input"
                type="text"
                placeholder={note.title}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateTitle(note.id)}>
                <AiOutlineSave />
              </button>
            </div>
          )}

          {!showTitleInput && (
            <button
              className="shadow transform transition ease-in duration-100 px-2 text-sm font-medium rounded-sm"
              onClick={() => {
                showTitleInput
                  ? setShowTitleInput(false)
                  : setShowTitleInput(true);
              }}
            >
              <FiEdit2 />
            </button>
          )}
        </div>
        <button
          className="shadow transform transition ease-in duration-200 text-red-300 px-2 text-sm font-medium border-red-300 rounded-full border border-gray-500 hover:bg-slate-100 hover:text-red-600 hover:shadow-xl"
          onClick={() => {
            onDelete(note.id);
          }}
        >
          X
        </button>

        {/* <input type="text" value={note.content} /> */}
      </div>

      {showContentInput && (
        <div>
          <input
            className="content-input"
            type="text"
            placeholder={note.content}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={() => updateContent(note.id)}>
            <AiOutlineSave />
          </button>
        </div>
      )}
      <div className="border-t border-white p-2 rounded-br-[6px]] rounded-bl-[6px] text-slate-600">
        <div className="flex gap-1">
          <p>{note.content}</p>
          {!showContentInput && (
            <button
              className="shadow transform transition ease-in duration-100 px-2 text-sm font-medium rounded-sm"
              onClick={() => {
                showContentInput
                  ? setShowContentInput(false)
                  : setShowContentInput(true);
              }}
            >
              <FiEdit2 />
            </button>
          )}
        </div>
        <br />
        <p className="text-sm">
          @{note.username.substring(0, 10).concat("...")}
        </p>
      </div>
    </div>
  );
};

export default Note;
