// import Bingo from "./Components/ButtonObj";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { useEffect, useState } from "react";
import "./App.css";
// import List from "./components/List";
import Header from "./components/Header";
import AddToList from "./components/AddToList";

export interface IState {
  items: {
    id: number;
    title: string;
    content: string;
  }[];
}

function App() {
  const [items, setItems] = useState<IState["items"]>(() => {
    const savedItems: any = localStorage.getItem("items");
    const items = JSON.parse(savedItems);
    return items || [];
  });

  // {
  //   id: 1,
  //   title: "Card 1",
  //   content: "Card 1 content",
  // },

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleDelete = (id: number) => {
    // e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const filteredItems = items.filter((item) => {
      return item.id !== id;
    });

    setItems(filteredItems);
    // setNotes([...notes].filter((note) => note.id !== id));
    // setItems([...items].filter((item) => item.id !== id));
  };

  interface IProps {
    items: IState["items"];
  }

  const List: React.FC<IProps> = ({ items }) => {
    // const [showItem, setShowItem] = useState<React.SetStateAction<boolean>>(true);
    const renderList = (): JSX.Element[] => {
      return items?.map((item) => {
        return (
          <li key={item.id}>
            <div className="flex flex-col max-w-[300px] sm:w-80 border-solid border-2 border-slate-400 rounded-br-lg rounded-bl-lg rounded-tr-3xl shadow-lg">
              <div className="flex justify-between p-2  rounded-tr-3xl text-white text-xl bg-gradient-to-b from-slate-500 to-slate-400">
                {item.title}
                <button
                  className="text-red-400 px-2 text-sm bg-gray-200 rounded-full border border-gray-500 hover:bg-white hover:text-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  X
                </button>
              </div>
              <div className="bg-white p-2 rounded-br-lg rounded-bl-lg">
                {item.content}
              </div>
            </div>
          </li>
        );
      });
    };
    return <ul className="flex flex-wrap gap-3">{renderList()}</ul>;
  };

  return (
    <div className="App bg-gradient-to-r from-stone-300">
      <Header />
      <div className="flex justify-center">
        <AddToList setItems={setItems} items={items} />
      </div>
      <main className="flex flex-wrap gap-6 text-slate-600 mt-4">
        <List items={items} />
      </main>
    </div>
  );
}

export default App;
