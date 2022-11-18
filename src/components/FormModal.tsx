import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface addFormData {
  title: string;
  content: string;
}

const FormModal = ({ setShowModal }: any) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    content: yup.string().required("You must add content."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addFormData>({
    resolver: yupResolver(schema),
  });

  const noteRef = collection(db, "notes");

  const onAddNote = async (data: addFormData) => {
    await addDoc(noteRef, {
      ...data,
      // title: data.title,
      // content: data.content,
      username: user?.displayName,
      userId: user?.uid,
    });

    navigate("/");
  };

  return (
    <div className="fixed flex justify-center items-center bg-slate-300 z-50 left-0 top-0 h-full w-full">
      <div className="text-lg bg-slate-600 border border-green-500 shadow-2xl shadow-slate-200 w-fit rounded-2xl px-12 py-7">
        <form onSubmit={handleSubmit(onAddNote)}>
          <h1 className="text-2xl">Add a note</h1>
          <input
            placeholder="Title..."
            {...register("title")}
            className="p-2 my-2 rounded-sm"
          />
          <p className="text-red-500">{errors.title?.message}</p>
          <textarea
            rows={4}
            placeholder="Content..."
            {...register("content")}
            className="p-2 w-[230px] rounded-sm text-gray-600"
          />
          <p className="text-red-500">{errors.content?.message}</p>
          <input
            type="submit"
            className="m-2 h-30 cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline text-gray-600 bg-green-300 rounded border border-white p-2 shadow-md"
          />
          <button
            className="m-2 h-30 cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline text-gray-600 bg-red-300 rounded border border-white p-2 shadow-md"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
