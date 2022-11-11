// import React, { useState } from "react";
// import { IState as Props } from "../App";
// // import { faBeer } from "react-icons/fa";

// interface IProps {
//   items: Props["items"];
// }

// const List: React.FC<IProps> = ({ items }) => {
//   // const [showItem, setShowItem] = useState<React.SetStateAction<boolean>>(true);
//   const renderList = (): JSX.Element[] => {
//     return items.map((item) => {
//       const handleDelete = (id: any) => {
//         // e: React.MouseEvent<HTMLElement, MouseEvent>) => {
//         // console.log(e.target);
//         // console.log(e.currentTarget);
//         // setNotes([...notes].filter((note) => note.id !== id));
//       };
//       return (
//         <li key={item.id}>
//           <div className="flex flex-col w-80 h-48 border-solid border-2 border-slate-400 rounded-br-lg rounded-bl-lg rounded-tr-3xl shadow-lg">
//             <div className="flex justify-between p-2 rounded-tr-3xl text-white text-xl bg-gradient-to-b from-slate-500 to-slate-400">
//               {item.title}
//               <button
//                 className="text-red-400 px-2 text-md"
//                 onClick={handleDelete}
//               >
//                 X
//               </button>
//             </div>
//             <div className="bg-white h-48 p-2 rounded-br-lg rounded-bl-lg">
//               {item.content}
//             </div>
//           </div>
//         </li>
//       );
//     });
//   };
//   return <ul className="flex flex-wrap gap-3">{renderList()}</ul>;
// };

// export default List;
