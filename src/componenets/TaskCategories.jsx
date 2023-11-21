import React, { useState } from "react";
import styles from "./TaskCategories.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskCategories = ({ addCategory, removeCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      setCategories([...categories, categoryName]);
      setCategoryName("");
    }
  };

  const handleRemoveCategory = (category) => {
    // Remove the category from the list
    setCategories(categories.filter((cat) => cat !== category));
  };

  return (
    <div className={styles.taskCategories}>
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button onClick={handleAddCategory}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category}
            <button onClick={() => handleRemoveCategory(category)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCategories;
