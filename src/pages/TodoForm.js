import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

function TodoForm() {
  let ChkBox;

  const navigate = useNavigate();
  const unique_id = uuid();
  let [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [selectedSelectors,setSelectedSelctors]=useState([])
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [agree, setAgree] = useState(null);
  const [checkbox, setCheckbox] = useState(null);
  console.log(agree, "box");

  const addTask = () => {
    if (taskInput.trim() !== "" && taskInput?.length > 2) {
      const newTask = { id: unique_id, text: taskInput, termAgree: checkbox, selectors:selectedSelectors };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      navigate("/");
    } else {
      setError("Name lenght must be greater than 2");
    }
  };
  console.log(checkbox, "check");

  const updateTask = () => {
    if (editId && taskInput.trim() !== "" && taskInput?.length > 2) {
      const updatedTasks = tasks.map((task) =>
        task?.id === editId
          ? { ...task, text: taskInput, termAgree: checkbox,selectors:selectedSelectors }
          : task
      );
      console.log(updatedTasks, "updatedTaskss");
      setTasks(updatedTasks);
      setEditId(null);
      setTaskInput("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      navigate("/");
    } else {
      setError("Name lenght must be greater than 2");
    }
  };
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);
  useEffect(() => {
    const query = searchParams.get("id");
    if (query) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const filterTaskName = storedTasks?.filter((task) => task?.id == query)[0];
      const filterAgreeTerm = storedTasks?.filter((task) => task?.id == query)[0];
      console.log(filterAgreeTerm, query, "filtersssss");

      setTaskInput(filterTaskName?.text);
      setAgree(filterAgreeTerm?.termAgree);
      setSelectedSelctors(filterAgreeTerm?.selectors);

      setEditId(query);
    }
  }, []);

const selector = localStorage.getItem("selector") || []

  return (
    <div className="flex flex-col gap-9 shadow-lg px-2 py-2 mt-10 items-center m-auto rounded-lg sm:w-[50%] sm:border">
      <h1 className="font-bold uppercase mt-3 ">Form</h1>
      <p className="font-medium text-center md:w-[70%]">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </p>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          {
            !editId ? addTask() : updateTask();
          }
        }}
      >
        <div className="w-full flex gap-2 items-center flex-col">
          <div className="w-full">
            <label htmlFor="name" className="">
              Name:
            </label>
            <input
              type="text"
              value={taskInput}
              onChange={(e) => {
                setTaskInput(e.target.value);
                setError(null);
              }}
              id="name"
              required
              className="w-full  mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-stone-500 block rounded-md sm:text-sm "
              placeholder="Name"
            />
          </div>
          {!taskInput?.length > 0 && (
            <div className="text-[red] w-full">Name should not be epmty</div>
          )}
          {error && <div className="text-[red] w-full">{error}</div>}
        </div>
        <div className=" w-full ">
          <p className="select-none ">Sectors:</p>
          <select
            multiple={true}
            size="5"
            className=" outline-none border-2 w-full sm:w-[80%]"
            onChange={(e)=>{
              var options = e.target.options;
              var value = [];
              for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                  value.push(options[i].value);
                }
              }
            setSelectedSelctors(value)
              
              console.log(value)
            }}
          >
              {selector.length && JSON.parse(selector).map((v)=><option selected={
                selectedSelectors.filter(value=>value==v.value).length ? true :false
                } value={v.value}>{v.label}</option>)}
            
          </select>
        </div>
        <div className="flex gap-3 items-center w-full ">
          <input
            type="checkbox"
            defaultChecked={agree && true}
            id="checkbox"
            className="w-[15px] h-[15px]"
            onChange={(e) => setCheckbox(e.target.checked)}
          />
          <label htmlFor="checkbox" className="font-medium">
            Agree to terms
          </label>
        </div>
        <button
          type="submit"
          disabled={!taskInput || error}
          className=" disabled:border-[red] disabled:text-red-400 disabled:bg-red-100 disabled:cursor-not-allowed  mb-3 w-full flex border-2 justify-center items-center py-2 hover:bg-stone-100 px-8 rounded-lg text-black  pointer-events-auto "
        >
          {!editId ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
