import React, { useEffect, useState } from "react";
import styles from "./taskinput.module.scss";
import { TTodo } from "../../@types/todo.type";
interface Props {
  handleAdd: (item: string) => void;
  itemUpdate: TTodo | undefined;
  handleSubmitUpdate: (item: any) => void;
}
export const TaskInput = ({
  handleAdd,
  itemUpdate,
  handleSubmitUpdate,
}: Props) => {
  const [valueTodo, setValueTodo] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const handleSubmit = () => {
    if (!isUpdating) {
      handleAdd(valueTodo);
    } else {
      const newUpdate = {
        name: valueTodo,
        id: itemUpdate?.id,
        done: itemUpdate?.done,
      };
      handleSubmitUpdate(newUpdate);
      setIsUpdating(false);
    }

    setValueTodo("");
  };
  useEffect(() => {
    if (itemUpdate?.name) {
      setValueTodo(itemUpdate.name);
      setIsUpdating(true);
    }
  }, [itemUpdate]);
  return (
    <>
      <h1 className={styles.title}>Todolist</h1>
      <div className={styles.taskInput}>
        <input
          type="text"
          placeholder="Add todo"
          onChange={(e) => setValueTodo(e.target.value)}
          value={valueTodo}
        />

        <button onClick={() => handleSubmit()}>➕</button>
      </div>
    </>
  );
};
