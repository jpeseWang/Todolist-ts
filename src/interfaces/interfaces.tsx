export interface Todo {
  id: number
  text: string
  completed: boolean
  deadline: string
}

export interface TodoState {
  todos: Todo[]
  filter: string
}

export type Action =
  | { type: 'ADD_TODO', payload: Todo }
  | { type: 'TOGGLE_TODO', payload: number }
  | { type: 'DELETE_TODO', payload: number }
  | { type: 'SET_FILTER', payload: string }
  | { type: 'EDIT_TODO', payload: { id: number, text: string, deadline: string } }
  | { type: 'SET_TODOS', payload: Todo[] };
