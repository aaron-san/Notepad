import React, { useState, useEffect } from "react";
import { INote } from "../../App";
import { db } from "../../config/firebase";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineSave, AiOutlineDelete } from "react-icons/ai";

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
  const [showDeleteButton, setShowDeleteButton] = useState(true);

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
      setShowDeleteButton(true);
      return;
    }

    if (updatedTitle === "") {
      setShowTitleInput(false);
      setShowDeleteButton(true);
      return;
      // window.confirm("Title is blank. Is this okay?");
    } else if (updatedTitle !== prevTitle) {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, {
        title: updatedTitle,
      });
      setShowTitleInput(false);
      setShowDeleteButton(true);

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
    <div className="note-card max-w-[95%] md:max-w-full">
      <div>
        {/* className="w-[93%] p-4 bg-slate-200 sm:w-85 rounded-md shadow-xl text-slate-600"> */}
        <div className="flex justify-between p-2 rounded-tr-[20px] text-xl">
          {/* <div className="flex"> */}
          {!showTitleInput && (
            <div className="flex gapx-2">
              <h1 className="font-[ScopeOne-Regular] title">{note.title}</h1>

              <button
                className="text-gray-200 hover:text-gray-800 transform transition ease-in duration-100 px-2 mr-1 text-md font-large rounded-sm"
                onClick={() => {
                  showTitleInput
                    ? setShowTitleInput(false)
                    : setShowTitleInput(true);
                  setShowDeleteButton(false);
                }}
              >
                <AiOutlineEdit size={22} />
              </button>
            </div>
          )}
          {showTitleInput && (
            <div className="flex align-center">
              <textarea
                className="title-input"
                rows={1}
                cols={50}
                placeholder="Enter a title..."
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button
                className="text-xl border border-blue-300 mx-3 p-2 rounded-xl bg-white hover:bg-emerald-300 transition ease-in duration-200"
                onClick={() => updateTitle(note.id, note.title)}
              >
                <AiOutlineSave size={22} />
              </button>
            </div>
          )}

          {showDeleteButton && (
            <button
              className="text-red-200 px-2 text-sm font-medium rounded-full  hover:text-red-600"
              onClick={() => {
                onDelete(note.id);
              }}
            >
              <AiOutlineDelete size={20} />
            </button>
          )}

          {/* <input type="text" value={note.content} /> */}
        </div>

        <div className="border-t border-red-500 p-2 rounded-br-[6px]] rounded-bl-[6px] text-slate-600">
          <div className="flex gap-1">
            {!showContentInput && <p>{note.content}</p>}
            {!showContentInput && (
              <button
                className="text-gray-200 hover:text-gray-900 transform transition ease-in duration-100 px-2 text-xl font-large rounded-sm"
                onClick={() => {
                  showContentInput
                    ? setShowContentInput(false)
                    : setShowContentInput(true);
                }}
              >
                <AiOutlineEdit size={22} />
              </button>
            )}
          </div>
          {showContentInput && (
            <div className="">
              <textarea
                className="border border-blue-300"
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
                className="text-xl border border-blue-300 mx-3 p-2 rounded-xl bg-white hover:bg-emerald-300 transition ease-in duration-200"
                onClick={() => updateContent(note.id, note.content)}
              >
                <AiOutlineSave size={22} />
              </button>
            </div>
          )}
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
