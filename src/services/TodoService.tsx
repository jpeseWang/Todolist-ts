import axios from 'axios';
// import { Todo } from '../interfaces/interfaces';
const instance = axios.create({
  baseURL: 'https://64b9f6dc79b7c9def6c17476.mockapi.io'
});

export const fetchTodos = async (): Promise<any> => {
  const res = await instance.get('/todos', { params: { _limit: 6 } });
  return res.data;
};

export const updateTodo = async (
  id: number,
  text: string,
  deadline: string,
  completed: boolean
): Promise<any> => {
  try {
    const response = await instance.put(`/todos/${id}`, {
      id,
      text,
      deadline,
      completed
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addTodo = async (id: number, text: string, deadline: string, completed: boolean): Promise<any> => {
  const response = await instance.post('/todos', { id, text, deadline, completed });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<any> => {
  await instance.delete(`/todos/${id}`);
};
