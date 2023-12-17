import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, Switch, Routes } from 'react-router-dom';
import AddRecord from "./pages/AddRecord";
import TodoForm from "./pages/TodoForm";

function App() {
  useEffect(()=>{


    const storeSelector=JSON.stringify([{
      value:"Manufacturing",
      label:"Manufacturing"
    },
    {
      value:"Construction_materials",
      label:"Construction materials"
    },
    {
      value:"Electronics_and_Optics",
      label:"Electronics and Optics"
    },
    {
      value:"Food_and_Beverage",
      label:"Food and Beverage"
    },
    {
      value:"Bakery",
      label:"Bakery"
    },
    {
      value:"Fish",
      label:"Fish"
    }
    ])
    if(!localStorage.getItem("selector"))
    {
    localStorage.setItem("selector",storeSelector)
    }

  },[])
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
