import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecord() {
  const navigate = useNavigate();
  const [storedTasks, setStoredTasks] = useState([]);
  const [view, setView] = useState(null);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setStoredTasks(storedTasks);


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

  }, []);
  const removeTask = (index) => {
    const newTasks = [...storedTasks];
    const filter = newTasks?.filter((task) => task?.id !== index);
    localStorage.setItem("tasks", JSON.stringify(filter));
    setStoredTasks(filter);
  };
  console.log(storedTasks,"storedTasks")
  return (
    <div className="w-full flex-col gap-5 h-full flex justify-center items-center py-9">
      <div
        className=" cursor-pointer border-2 w-fit px-4 py-2 rounded mt-4"
        onClick={() => navigate("/form")}
      >
        AddRecord
      </div>
      <div className="flex flex-col gap-2">
        {storedTasks?.map((task, indx) => (
          <>
            <div className="flex gap-4">
              <li className="flex gap-4">{task?.text} {task?.termAgree && <p>(Agree)</p> } </li>
              <button
                onClick={() => navigate(`/form?id=${task?.id}`)}
                className="border-2 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => setView(task?.id)}
                className="border-2 px-3 rounded"
              >
                View
              </button>
              <button
                onClick={() => removeTask(task?.id)}
                className="border-2 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </>
        ))}
        {view && (
          <>
            <div className="absolute flex justify-center items-center top-0 h-screen w-screen left-0 bg-stone-200 ">
              <div className="rounded-lg border-2 border-black w-[30rem] h-[20rem] px-3 py-2 bg-stone-50">
                <div
                  className="flex justify-end  cursor-pointer  "
                  onClick={() => setView(null)}
                >
                  <p className="px-2 py-0.5 border border-black rounded-full flex justify-center items-center">
                    X
                  </p>
                </div>
                <div className="flex justify-center items-center h-full -mt-8">
                  Name:{" "}
                  {storedTasks?.map((val) => val?.id == view && val?.text)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddRecord;
