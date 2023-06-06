import React, { useState, useEffect } from "react";
import { INote } from "../../App";
import { db } from "../../config/firebase";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
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

  const { note, notesList, setNotesList } = props;

  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);

  // Initialize updatedTitle and updatedConent variables
  // useEffect(() => {
  //   setUpdatedTitle(note.title);
  //   setUpdatedContent(note.content);
  // }, []);

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

  const updateTitle = async (id: string, prevTitle: string) => {
    if (updatedTitle === prevTitle) {
      setShowTitleInput(false);
      return;
    }

    if (updatedTitle === "") {
      setShowTitleInput(false);
      return;
      // window.confirm("Title is blank. Is this okay?");
    } else if (updatedTitle !== prevTitle) {
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
    }
  };

  const updateContent = async (id: string, prevContent: string) => {
    if (updatedContent === prevContent) {
      setShowContentInput(false);
      return;
    }

    if (updatedContent === "") {
      setShowContentInput(false);
      return;
    } else if (updatedContent !== prevContent) {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, {
        content: updatedContent === prevContent ? prevContent : updatedContent,
      });
      setShowContentInput(false);

      const updatedNotesList = notesList.map((doc) => {
        if (doc.id === id) {
          const updatedNote = {
            ...doc,
            content:
              updatedContent === prevContent ? prevContent : updatedContent,
          };
          return updatedNote;
        }
        return doc;
      });
      setNotesList(updatedNotesList);
    }
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
    <div className="note-card">
      <div>
        {/* className="w-[93%] p-4 bg-slate-200 sm:w-85 rounded-md shadow-xl text-slate-600"> */}
        <div className="flex justify-between p-2 rounded-tr-[20px] text-xl">
          <div className="title-container">
            {!showTitleInput && (
              <h1 className="font-[ScopeOne-Regular] title">{note.title}</h1>
            )}
            {showTitleInput && (
              <div>
                <textarea
                  className="title-input"
                  rows={1}
                  cols={50}
                  placeholder="Enter a title..."
                  value={updatedTitle}
                  onChange={
                    (e) => setUpdatedTitle(e.target.value)
                    // if (storedTitle !== "") {
                    // setUpdatedTitle(e.target.value);
                    // setStoredTitle(e.target.value);
                    // }

                    // note.title
                  }
                />
                <button onClick={() => updateTitle(note.id, note.title)}>
                  <AiOutlineSave />
                </button>
              </div>
            )}
          </div>
          <div className="flex align-center">
            {!showTitleInput && (
              <button
                className=" transform transition ease-in duration-100 px-2 mr-1 text-md font-medium rounded-sm"
                onClick={() => {
                  showTitleInput
                    ? setShowTitleInput(false)
                    : setShowTitleInput(true);
                }}
              >
                <AiOutlineEdit />
              </button>
            )}
            <button
              className="text-red-300 px-2 text-sm font-medium rounded-full hover:bg-slate-100 hover:text-red-600 hover:shadow-xl"
              onClick={() => {
                onDelete(note.id);
              }}
            >
              X
            </button>
          </div>

          {/* <input type="text" value={note.content} /> */}
        </div>

        {showContentInput && (
          <div className="">
            <textarea
              className="content-input"
              rows={4}
              cols={80}
              placeholder="Enter content..."
              value={updatedContent}
              onChange={
                (e) => setUpdatedContent(e.target.value)
                // setUpdatedContent(
                //   e.target.value === "" ? note.content : e.target.value
                // )
              }
            />
            <button
              className="m-2"
              onClick={() => updateContent(note.id, note.content)}
            >
              <AiOutlineSave />
            </button>
          </div>
        )}
        <div className="border-t border-white p-2 rounded-br-[6px]] rounded-bl-[6px] text-slate-600">
          <div className="flex gap-1">
            {!showContentInput && <p>{note.content}</p>}
            {!showContentInput && (
              <button
                className="transform transition ease-in duration-100 px-2 text-sm font-medium rounded-sm"
                onClick={() => {
                  showContentInput
                    ? setShowContentInput(false)
                    : setShowContentInput(true);
                }}
              >
                <AiOutlineEdit />
              </button>
            )}
          </div>
          <br />
          <p className="text-sm">
            @{note.username.substring(0, 10).concat("...")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Note;
