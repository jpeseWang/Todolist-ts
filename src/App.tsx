import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/Home/Home";
import { Todo } from "./features/Todo/Todo";
import { ToastContainer } from "react-toastify";
function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="feature" element={<Todo />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
