"use client";
import { log } from "console";
import Image from "next/image";
import { useEffect, useState } from "react";
import Task from "../../components/Task";
type TaskProps = {
  _id: String;
  name: String;
  completed: boolean;
};
type Props = {
  task: TaskProps;
};
export default function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setTasks(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);
  return (
    <>
      <title>Task-Hub</title>
      <main className="flex justify-center  mt-10 min-h-screen">
        <div className="flex-col ">
          {" "}
          <div className=" shadow-2xl rounded-lg  w-[500px] mb-10 flex-col justify-center p-[40px]">
            <div>
              <p className="text-center pb-4 text-xl">Task Manager</p>
              <div className="flex ">
                <input
                  type="text"
                  className="outline-none border-0 bg-gray-200 px-2 w-[400px]"
                  placeholder="e.g Wash dishes"
                />{" "}
                <button
                  type="submit"
                  className="rounded-sm  bg-blue-500 px-2 py-1 text-white font-semibold"
                >
                  {" "}
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div>
            {tasks.map((task: TaskProps) => (
              <Task task={task} key={task._id.toString()} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
