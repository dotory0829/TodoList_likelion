import { useState, useEffect } from "react";
import { TodoItem } from "../types/TodoTypes";
import { getTodoList } from "../api/TodoApi";

export const useTodoData = () => {
  const [todoListData, setTodoListData] = useState<TodoItem[]>([]);

  useEffect(() => {
    const fetchTodoData = async () => {
      const data = await getTodoList();
      setTodoListData(data);
    };

    fetchTodoData();
  }, []);

  return { todoListData, setTodoListData };
};
