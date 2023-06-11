import React from "react";
import styles from "./tasklist.module.scss";
import Todo from "../Todo";
import { TTodo } from "../../@types/todo.type";
interface Props {
  title: string;
  doneTaskList?: boolean;
  tasks: TTodo[];
  handleAdd: (item: string) => void;
  handleOnCheck: (item: TTodo) => void;
  handleOnDelete: (item: TTodo) => void;
  handleOnUpdate: (item: TTodo) => void;
}
export const TaskList = ({
  title,
  handleOnDelete,
  tasks,
  handleAdd,
  handleOnCheck,
  handleOnUpdate,
}: Props) => {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.tasks}>
        {tasks.map((task, index) => (
          <Todo
            todo={task}
            key={task.id}
            handleAdd={handleAdd}
            handleOnCheck={handleOnCheck}
            handleOnDelete={handleOnDelete}
            handleOnUpdate={handleOnUpdate}
          />
        ))}
      </div>
    </div>
  );
};
