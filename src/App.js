import { useState } from "react";
import { BrowserRouter, Route, Link, Switch, Routes } from 'react-router-dom';
import AddRecord from "./pages/AddRecord";
import TodoForm from "./pages/TodoForm";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddRecord />} />
        <Route path="/form" element={<TodoForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
