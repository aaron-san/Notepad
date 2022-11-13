import React, { useEffect, useState } from "react";
import { IState as Props } from "../App";

interface IProps {
  items: Props["items"];
  setItems: React.Dispatch<React.SetStateAction<Props["items"]>>;
}

const AddToList: React.FC<IProps> = ({ setItems, items }) => {
  // const initItems = [
  //   {
  //     title: "Card 1",
  //     content: "Card 1 content",
  //   },
  // ];

  const [input, setInput] = useState({
    id: null,
    title: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (!input.title || !input.content) return;

    // Create id
    const baseDate = new Date("1999-12-31");
    const currentDate = new Date();
    const id = currentDate.getTime() - baseDate.getTime();

    // Add item to items
    setItems([
      ...items,
      {
        id: id,
        title: input.title,
        content: input.content,
      },
    ]);

    setInput({
      id: null,
      title: "",
      content: "",
    });
  };

  return (
    <div className="m-8 text-center">
      <input
        className="mx-3 border-2 border-orange-500 rounded-lg shadow-sm p-2"
        type="text"
        placeholder="Title"
        value={input.title}
        onChange={handleChange}
        name="title"
      />
      <input
        className="m-3 border-2 border-orange-500 rounded-lg shadow-sm p-2"
        type="text"
        placeholder="Content"
        value={input.content}
        onChange={handleChange}
        name="content"
      />
      <button
        className="text-white text-lg mx-3 bg-green-400 hover:bg-green-200 hover:text-slate-600 hover:shadow-xl border-3 border-white rounded-2xl px-5 py-1 mr-2"
        onClick={handleClick}
      >
        Add Card
      </button>
    </div>
  );
};

export default AddToList;
