"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Task = {
  _id: String;
  name: String;
  completed: boolean;
};

const page = ({ params }: { params: { id: string } }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const notify = () => toast("Task updated successfully!");

  const updateTask = async () => {
    if (!task) {
      return;
    }
    const updatedTask = {
      ...task,
      name,
      completed,
    };
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/tasks/${task._id.toString()}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) {
        const errorText = await response.text(); // Read the response body as text
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`
        );
      }
      const data = await response.json(); // Parse the response body as JSON
      notify();
      console.log("Task updated successfully:", data);
    } catch (error) {
      console.log(error);
    }
  };
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
        setName(result.task.name);
        setCompleted(result.task.completed);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [params.id]);
  return (
    <>
      <main className="flex justify-center items-center mt-10 font-MyFont   ">
        <div className="w-[500px] h-[400px] shadow-xl bg-white px-4 space-y-[30px] pb-10 ">
          <p className="py-5 flex justify-center text-xl "> Edit task</p>
          <div className="flex justify-between">
            <p>Task ID</p>
            <p>{task?._id}</p>
          </div>
          <div className="flex justify-between">
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 outline-none text-black w-[350px] px-4 border-none"
            />
          </div>
          <div className="flex space-x-9">
            <p>Completed</p>
            <input
              type="checkbox"
              name=""
              id=""
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>

          <button
            onClick={updateTask}
            className=" w-full py-2 bg-blue-700 text-white"
          >
            Submit
          </button>
          <Link href={"/"}>
            <div className="flex justify-center items-center">
              <button className="bg-gray-500 text-white px-2 rounded-md  mt-4 py-3">
                Back to Homepage
              </button>
            </div>
          </Link>
        </div>

        <ToastContainer />
      </main>
    </>
  );
};

export default page;
