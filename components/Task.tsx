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
  return <li>{task.name}</li>;
};
export default Task;
