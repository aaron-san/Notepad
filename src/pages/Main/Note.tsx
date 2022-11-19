import React from "react";
import { INote } from "./Main";

interface Props {
  note: INote;
}

export const Note = (props: Props) => {
  const { note } = props;
  return (
    <div className="p-4 max-w-[300px] bg-slate-400/.8 mx-auto sm:w-80 border border-2 border-green-100 rounded-br-[6px] rounded-bl-[6px] rounded-tr-[20px] shadow-lg">
      <div className="flex justify-between p-2 rounded-tr-[20px] text-white text-xl">
        <h1>{note.title}</h1>
        <button
          className="shadow transform transition ease-in-out duration-200 text-red-400 px-2 text-sm font-medium border-green-100 rounded-full border border-gray-500 hover:bg-white hover:text-red-600"
          //   onClick={() => handleDelete(note.id)}
        >
          X
        </button>
      </div>
      <div className="border-t text-gray-300 border-white p-2 rounded-br-[6px]] rounded-bl-[6px]">
        <p>{note.content}</p>
        <br />
        <p className="text-sm">
          @{note.username.substring(0, 10).concat("...")}
        </p>
      </div>
    </div>
  );
};
