import axios from "axios";
axios.defaults.baseURL = "http://localhost:33088/api/todolist";
axios.defaults.timeout = 2 * 1000;

import { TodoItem } from "../types/TodoTypes";

export const getTodoList = async (): Promise<TodoItem[]> => {
  try {
    const res = await axios.get(``);
    return res.data.items.reverse() as TodoItem[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTodoItem = async (_id: string): Promise<TodoItem> => {
  const res = await axios.get(`${_id}`);
  return res.data.item;
};

export const patchTodoList = async (
  _id: string,
  title: string,
  content: string
) => {
  try {
    const res = await axios.patch(
      `http://localhost:33088/api/todolist/${_id}`,
      {
        title,
        content,
      }
    );
    if (res.status === 200) {
      alert("수정이 완료되었습니다.");
    }
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (_id: string | number) => {
  try {
    const res = await axios.delete(
      `http://localhost:33088/api/todolist/${_id}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (title: string, content: string) => {
  try {
    const res = await axios.post(`http://localhost:33088/api/todolist`, {
      title,
      content,
      done: false,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
