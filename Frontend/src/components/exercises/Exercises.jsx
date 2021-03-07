import React, { useEffect, useState } from "react";
import axios from "axios";

import Exercise from "./exercise/Exercise";
import styles from "./exercises.module.css";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  // Get exercises from DB when this componet loads and put on exercises state
  useEffect(() => {
    axios
      .get("http://localhost:27348/exercises/")
      .then((res) => setExercises(res.data));
  }, []);

  // Delete Exercise
  const handleDeleteExercise = async (id) => {
    // Delete from front-end
    const newExercisesArray = exercises.filter(
      (exercise) => exercise._id !== id
    );

    // Update the state
    setExercises(newExercisesArray);

    // Delete from backend
    await axios
      .delete(`http://localhost:27348/exercises/${id}`)
      .then(() => console.log("Exercise Deleted"));
  };

  return (
    // Table with Exercises
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Description</th>
          <th>Duration</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      {/* Map through the exercises array and create a row for each exercise on DB */}
      {exercises.map((exercise) => (
        <Exercise
          deleteExercise={handleDeleteExercise}
          exercise={exercise}
          key={exercise._id}
        />
      ))}
    </table>
  );
};

export default Exercises;
