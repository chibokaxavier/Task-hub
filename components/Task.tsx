import Link from "next/link";
import React from "react";
type TaskProps = {
  _id: String;
  name: String;
  completed: boolean;
};
type Props = {
  task: TaskProps;
};
const Task: React.FC<Props> = ({ task }) => {
  return (
    <>
      <Link href={`/tasks/${task._id}`}>
        <div className="bg-black my-4 flex py-4 pl-4">
          <p>{task.name}</p>
        </div>
      </Link>
    </>
  );
};
export default Task;
