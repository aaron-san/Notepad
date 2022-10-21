import React from "react";
import { IState as Props } from "../App";

interface IProps {
  items: Props["items"];
}

const List: React.FC<IProps> = ({ items }) => {
  const renderList = (): JSX.Element[] => {
    return items.map((item) => {
      return (
        <li key={item.id}>
          <div className="flex flex-col w-80 h-48 border-solid border-2 border-slate-400 rounded-br-lg rounded-bl-lg rounded-tr-3xl shadow-lg">
            <div className="p-2 rounded-tr-3xl text-white text-xl bg-gradient-to-b from-slate-500 to-slate-400">
              {item.title}
            </div>
            <div className="bg-white h-48 p-2 rounded-br-lg rounded-bl-lg">
              {item.content}
            </div>
          </div>
        </li>
      );
    });
  };
  return <ul className="flex flex-wrap gap-3">{renderList()}</ul>;
};

export default List;
