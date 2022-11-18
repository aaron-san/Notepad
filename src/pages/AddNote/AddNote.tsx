import React, { useEffect } from "react";
import { useState } from "react";
// import AddNote from "../AddNote/AddNote";
import FormModal from "../../components/FormModal";

export interface IState {
  items: {
    id: number;
    title: string;
    content: string;
    username: string;
  }[];
}

// function AddNote() {
//   const [items, setItems] = useState<IState["items"]>(() => {
//     const savedItems: any = localStorage.getItem("items");
//     const items = JSON.parse(savedItems);
//     return items || [];
//   });

// useEffect(() => {
//   localStorage.setItem("items", JSON.stringify(items));
// }, [items]);

// const handleDelete = (id: number) => {
//   const filteredItems = items.filter((item) => {
//     return item.id !== id;
//   });

//   setItems(filteredItems);
//   // setNotes([...notes].filter((note) => note.id !== id));
//   // setItems([...items].filter((item) => item.id !== id));
// };

// interface IProps {
//   items: IState["items"];
// }

//   return false;
//   // <div className="fixed text-slate-600 mt-4 bg-slate-300 h-full w-full">
//   // <Form />
//   // </div>
// }

// export default AddNote;
