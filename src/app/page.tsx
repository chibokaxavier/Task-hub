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
      <main className="flex justify-center  mt-10 min-h-screen text-white">
        <div className="flex-col ">
          {" "}
          <div className="bg-black h-fit w-fit mb-10 flex-col justify-center p-[60px]">
            <div>
              <p className="text-center pb-4 text-2xl">Task Manager</p>
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
          <div className="bg-red-500">
            {tasks.map((task: TaskProps) => (
              <Task task={task} key={task._id.toString()} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
