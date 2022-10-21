// import Bingo from "./Components/ButtonObj";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
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
  const [items, setItems] = useState<IState["items"]>([
    {
      id: 1,
      title: "Card 1",
      content: "Card 1 content",
    },
  ]);

  //   // Create id
  //   const baseDate = new Date("1999-12-31");
  //   const currentDate = new Date();
  //   const id = currentDate.getTime() - baseDate.getTime();
  //   const newItem = { id, item };

  //   setItems({ ...items, newItem });
  // };

  return (
    <div className="App bg-gradient-to-r from-stone-300">
      <Header />
      <div className="flex justify-center">
        <AddToList setItems={setItems} items={items} />
      </div>
      <main className="flex flex-wrap gap-6 text-slate-600 mt-4 px-10">
        <List items={items} />
      </main>
    </div>
  );
}

export default App;
