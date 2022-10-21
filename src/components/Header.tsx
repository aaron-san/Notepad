import React from "react";

// interface cardProps {
//   items: {
//     title: string;
//     content: string;
//   };
// }

// interface functionProps {
//   buttonHandler: void;
// }
function Header() {
  return (
    <div className="flex place-content-between items-center bg-slate-600 text-white text-3xl px-4 py-3 flex border-b-2 border-white">
      <div className="">Notepad</div>
      {/* <AddToList {handleClick}/> */}
    </div>
  );
}

export default Header;

// .App-header {
//     background-color: #282c34;
//     height: 50px;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: space-between;
//     font-size: calc(10px + 2vmin);
//     color: white;
//     padding-left: 20px;
//   }
