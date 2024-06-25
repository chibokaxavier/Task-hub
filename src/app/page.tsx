"use client";
import { useEffect, useState } from "react";
import Task from "../../components/Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const createNotify = () => toast("Task created successfully!");
  const deleteNotify = () => toast("Task deleted successfully!");

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
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("network response wasnt ok");
      }
      setTasks(tasks.filter((task) => task._id !== id));
      deleteNotify();
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    const newTask = {
      name,
      completed,
    };
    try {
      const response = await fetch(`http://localhost:3001/api/v1/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Read the response body as text
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`
        );
      }
      const data = await response.json(); // Parse the response body as JSON
      console.log("Task created successfully:", data);
      tasks.push(data.task);
      setName("");
      createNotify();
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };

  return (
    <>
      <title>Task-Hub</title>
      <main className="flex justify-center  mt-10 min-h-screen font-MyFont">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />{" "}
                <button
                  onClick={createTask}
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
              <Task
                task={task}
                key={task._id as string}
                onDelete={() => deleteTask(task._id as string)}
              />
            ))}
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
