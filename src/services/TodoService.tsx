import axios from 'axios';
// import { Todo } from '../interfaces/interfaces';
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchTodos = async (): Promise<any> => {
  const res = await instance.get('/todos', { params: { _limit: 6 } });
  return res.data;
};

export const updateTodo = async (
  id: number,
  text: string,
  deadline: string
): Promise<any> => {
  try {
    const response = await axios.put(`/todos/${id}`, {
      text,
      deadline
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addTodo = async (id: number, text: string, deadline: string): Promise<any> => {
  const response = await instance.post('/todos', { id, text, deadline });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<any> => {
  await instance.delete(`/todos/${id}`);
};
