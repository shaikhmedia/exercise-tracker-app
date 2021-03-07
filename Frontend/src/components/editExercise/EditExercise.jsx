import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import styles from "./editExercise.module.css";

const EditExercise = () => {
  const params = useParams();
  const history = useHistory();
  const [exercises, setExercises] = useState([]);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  // Get exercises array from DB when this component loads
  useEffect(() => {
    axios.get("http://localhost:27348/exercises").then((res) => {
      // Update exercises array with the data
      setExercises(res.data);

      // Map through the array and if params id and exercise id are same then update username state with exercise's username
      res.data.map((exercise) => {
        if (exercise._id === params.id) {
          setUsername(exercise.username);
        }
      });
    });
  }, []);

  // Sumbit the updated exercise
  const handleSubmit = async (e) => {
    e.preventDefault();

    // This object should have all the properties of backend udpate route
    const exercise = {
      username,
      description,
      duration,
      date: new Date(),
    };

    // Post updated exercise to DB
    await axios
      .post(`http://localhost:27348/exercises/update/${params.id}`, exercise)
      .then(() => console.log("Exercise updated"));

    //Redirect to homepage
    history.push("/");
  };

  return (
    // Exercise edit form
    <div className={styles.EditExercise}>
      <h3>Edit Exercise</h3>
      {exercises.map((exercise) => {
        if (exercise._id === params.id) {
          return (
            <form>
              <label htmlFor="users">User</label>
              <select name="edit-exercise" id="user">
                <option value="user">{exercise.username}</option>
              </select>
              <label htmlFor="description">Name of exercise</label>
              <input
                type="text"
                name="edit-exercise"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="duration">Duration (in minute)</label>
              <input
                type="number"
                name="edit-exercise"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <input
                type="submit"
                name="edit-exercise"
                id="submit"
                onClick={handleSubmit}
              />
            </form>
          );
        }
      })}
    </div>
  );
};

export default EditExercise;
