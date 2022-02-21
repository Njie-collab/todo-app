import React, { useState, useRef, useEffect } from "react";

import Header from "./componnents/Header";
import Section from "./componnents/Section";
import Footer from "./componnents/Footer";

import "./App.css";

const App = () => {
  const [task, setTask] = useState({ id: 0, task: "", done: false });
  const [tasks, setTasks] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    let storage = localStorage.getItem("tasks");
    let storageItem = JSON.parse(storage);
    storageItem !== null && setTasks(storageItem);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    task.task.length > 0 && setTasks([...tasks, task]);
    inputRef.current.focus();
    setTask({ id: 0, task: "", done: false });
  };

  const handleDelete = (toBeDeleted) => {
    setTasks(tasks.filter((item) => item.id !== toBeDeleted));
  };

  return (
    <main>
      <Header
        task={task}
        setTask={setTask}
        handleSubmit={handleSubmit}
        inputRef={inputRef}
      />
      <Section tasks={tasks} handleDelete={handleDelete} />
      <Footer />
    </main>
  );
};

export default App;
