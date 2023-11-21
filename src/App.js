// App.js
import React, { useEffect, useRef, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskForm from "./componenets/TaskForm";
import TaskList from "./componenets/TaskList";
import TaskCategories from "./componenets/TaskCategories";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./App.module.css";

const App = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [categories, setCategories] = useLocalStorage("categories", []);
  const taskNameInputRef = useRef(null);

  useEffect(() => {
    // Focus on the task name input field when the TaskForm component mounts
    if (taskNameInputRef.current) {
      taskNameInputRef.current.focus();
    }
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const removeCategory = (category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const assignTaskToCategory = (taskId, category) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, category } : task
    );
    setTasks(updatedTasks);
  };

  // Memoize the sorted task list based on priorities
  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => a.priority.localeCompare(b.priority));
  }, [tasks]);

  return (
    <Router>
      <div className={`container ${styles.appContainer}`}>
        <h1>Task Manager</h1>
        <nav>
          <ul className={`nav nav-tabs ${styles.navTabs}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-task" className="nav-link">
                Add Task
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/add-task"
            element={
              <TaskForm
                onSubmit={addTask}
                categories={categories}
                taskNameInputRef={taskNameInputRef}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <TaskCategories
                categories={categories}
                onAddCategory={addCategory}
                onRemoveCategory={removeCategory}
              />
            }
          />
          <Route
            path="/"
            element={
              <TaskList
                tasks={sortedTasks}
                categories={categories}
                onAssignTask={assignTaskToCategory}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
