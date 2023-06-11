import React, { useEffect, useState } from "react";
import styles from "./Todolist.module.scss";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import _ from "lodash";
import { TTodo } from "../../@types/todo.type";

interface HandleNewTodos {
  (todos: TTodo[]): TTodo[];
}

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem("todos");
  const todosObj: TTodo[] = JSON.parse(todosString || "[]");
  const newTodosObj = handleNewTodos(todosObj);
  localStorage.setItem("todos", JSON.stringify(newTodosObj));
};

export default function Todolist() {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [tasksDone, setTasksDone] = useState<TTodo[]>(
    todos.filter((todo) => todo.done)
  );
  const [tasksUnDone, setTasksUnDone] = useState<TTodo[]>(
    todos.filter((todo) => !todo.done)
  );
  const [todoUpdated, setTodoUpdated] = useState<TTodo | undefined>();

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    const todosObj: TTodo[] = JSON.parse(todosString || "[]");
    setTodos(todosObj);
  }, []);

  useEffect(() => {
    setTasksDone(todos.filter((todo) => todo.done));
    setTasksUnDone(todos.filter((todo) => !todo.done));
  }, [todos]);

  const handleAdd = (item: string) => {
    if (!item) {
      alert("error");
    } else {
      const todo: TTodo = {
        name: item,
        done: false,
        id: new Date().toISOString(),
      };
      const handler = (todosObj: TTodo[]) => {
        return [...todosObj, todo];
      };
      setTodos((prev) => [...prev, todo]);
      syncReactToLocal(handler);
    }
  };

  const handleOnCheck = (item: TTodo) => {
    if (!item.done) {
      const newItem: TTodo = { ...item, done: true };
      setTasksDone((prev) => [...prev, newItem]);
    } else {
      const newItem: TTodo = { ...item, done: false };
      setTasksUnDone((prev) => [...prev, newItem]);
    }
    const handler = (todosObj: TTodo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === item.id) {
          todo.done = !todo.done;
          // console.log(todo);
        }
        return todo;
      });
    };

    // setTodos(newTodos);
    setTodos(handler);
    syncReactToLocal(handler);
  };

  const handleOnDelete = (item: TTodo) => {
    const handler = (todosObj: TTodo[]) => {
      return todos.filter((todo) => todo !== item);
    };
    setTodos(handler);
    syncReactToLocal(handler);
  };

  const handleOnUpdate = (item: TTodo) => {
    setTodoUpdated(item);
  };

  const handleSubmitUpdate = (item: TTodo) => {
    const handler = (todosObj: TTodo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === todoUpdated?.id) {
          todo.name = item.name;
        }
        return todo;
      });
    };
    // const newTodos = todos.map((todo) => {
    //   if (todo.id === todoUpdated?.id) {
    //     todo.name = item.name;
    //   }
    //   return todo;
    // });
    setTodos(handler);
    syncReactToLocal(handler);
  };

  return (
    <>
      <TaskInput
        handleAdd={handleAdd}
        itemUpdate={todoUpdated}
        handleSubmitUpdate={handleSubmitUpdate}
      />
      <TaskList
        // doneTaskList={false}
        title="Chưa hoàn thành"
        tasks={tasksUnDone}
        handleAdd={handleAdd}
        handleOnCheck={handleOnCheck}
        handleOnDelete={handleOnDelete}
        handleOnUpdate={handleOnUpdate}
      />
      <TaskList
        // doneTaskList={true}
        title="Hoàn thành"
        tasks={tasksDone}
        handleAdd={handleAdd}
        handleOnCheck={handleOnCheck}
        handleOnDelete={handleOnDelete}
        handleOnUpdate={handleOnUpdate}
      />
    </>
  );
}
