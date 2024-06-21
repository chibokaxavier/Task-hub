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
      <div className="text-black">
        {task ? (
          <div className="text-black">{task.name}</div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default page;
