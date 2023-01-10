import { useEffect, useState } from "react";
import TaskListItem from "./TaskListItem";

const TaskList = () => {
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/v1/tasks`);
      const data = await response.json();
      console.log(response);
      setTask(data);
    };
    fetchTasks();
  }, []);

  return (
    <>
    <h1 className="preDef">Predefined Task List</h1>
      <ul className="tasklist">
        {tasks.map((task) => (
          <TaskListItem key={task.id} id={task.id} name={task.name} />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
