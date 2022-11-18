import React from "react";
// import { addDoc, collection, query } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { db, auth } from "../config/firebase";
import { INote } from "../pages/Home";

interface Props {
  note: INote;
}

export const Note = (props: Props) => {
  //   const { note } = props;
  //   const [user] = useAuthState(auth);

  //   const  likesRef = collection(db, "likes")

  // const likesDoc = query()

  //   const addLike = async () => {
  //     await addDoc(likesRef, { userId: user?.uid, postId: post.id });
  //   };

  return <div>Note</div>;
};

export default Note;
