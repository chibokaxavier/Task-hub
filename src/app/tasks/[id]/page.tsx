"use client";
import React, { useEffect, useState } from "react";
type Task = {
  _id: String;
  name: String;
  completed: boolean;
};
const page = ({ params }: { params: { id: string } }) => {
  const [task, setTask] = useState<Task | null>(null);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/tasks/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setTask(result.task);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);
  useEffect(() => {
    console.log(task);
  }, [task]);
  return (
    <>
      <div className="justify-center items-center flex">
        <div className="bg-black h-fit w-fit mb-10 flex-col justify-center p-[60px]">
          <div className="justify-center items-center ">
            <p className=" text-white text-center pb-4 text-2xl">Edit Task</p>
            <div className="flex space-x-3">
              <input
                type="text"
                className="outline-none border-0 text-black px-2"
                placeholder="e.g Wash dishes"
              />{" "}
              <button
                type="submit"
                className="rounded-sm bg-blue-500 p-2 text-black font-bold"
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="text-black">{task?.name}</div>
      </div>
    </>
  );
};

export default page;
