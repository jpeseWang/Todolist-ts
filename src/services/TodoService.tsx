import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const fetchTodos = async (): Promise<any> => {
  try {
    const response = await instance.get("todos", {
      params: { _limit: 6 },
      transformResponse: (response: any) => {
        const data = JSON.parse(response);
        return data.map((todo: any) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        }));
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
