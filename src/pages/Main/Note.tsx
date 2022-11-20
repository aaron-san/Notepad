import React from "react";
import { INote } from "./Main";

interface Props {
  note: INote;
}

export const Note = (props: Props) => {
  const { note } = props;
  return (
    <div className="p-4 w-[400px] bg-slate-200 mx-auto sm:w-80 rounded-md shadow-xl text-slate-600">
      <div className="flex justify-between p-2 rounded-tr-[20px] text-xl">
        <h1>{note.title}</h1>
        <button
          className="shadow transform transition ease-in-out duration-200 text-red-400 px-2 text-sm font-medium border-green-700 rounded-full border border-gray-500 hover:bg-gray-200 hover:text-red-600"
          //   onClick={() => handleDelete(note.id)}
        >
          X
        </button>
      </div>
      <div className="border-t text-gray-300 border-white p-2 rounded-br-[6px]] rounded-bl-[6px] text-slate-600">
        <p>{note.content}</p>
        <br />
        <p className="text-sm">
          @{note.username.substring(0, 10).concat("...")}
        </p>
      </div>
    </div>
  );
};
