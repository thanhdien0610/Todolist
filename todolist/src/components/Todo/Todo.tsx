import React from "react";
import styles from "./todo.module.scss";
import { TTodo } from "../../@types/todo.type";
export interface TodoProps {
  todo: TTodo;

  handleAdd: (item: string) => void;
  handleOnCheck: (item: TTodo) => void;
  handleOnDelete: (item: TTodo) => void;
  handleOnUpdate: (item: TTodo) => void;
}

export default function Todo({
  todo,
  handleOnCheck,
  handleOnDelete,
  handleOnUpdate,
}: TodoProps) {
  const [isTaskDone, setIsTaskDone] = React.useState(todo.done);
  const isDone = () => {
    if (todo.done) return `${styles.todoNameDone}`;
  };

  return (
    <div className={`todo-${todo.id} ${styles.todo}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        defaultChecked={isTaskDone ? true : false}
        onClick={() => handleOnCheck(todo)}
      />
      <span className={`${styles.todoName} ${isDone()}`}>{todo.name}</span>

      <div className={styles.todoActions}>
        <button className={styles.todoBtn} onClick={() => handleOnUpdate(todo)}>
          📝
        </button>
        <button className={styles.todoBtn} onClick={() => handleOnDelete(todo)}>
          🗑
        </button>
      </div>
    </div>
  );
}
