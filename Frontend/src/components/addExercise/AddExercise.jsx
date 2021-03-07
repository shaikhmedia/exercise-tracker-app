import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./addExercise.module.css";
import { useHistory } from "react-router-dom";

const AddExercise = () => {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get the users from DB and set to state
    axios.get("http://localhost:27348/users").then((res) => {
      setUsers(res.data);
      // Set username state with the value of username property of the first object in the user array
      // Later when we set the value of SELECT in the form as username, this username will be the default value
      setUsername(res.data[0].username);
    });
  }, []);

  // Submit Exercise to DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exercise object
    const exercise = {
      username,
      description,
      duration,
      date: new Date(),
    };

    // Post new exercise to DB
    await axios
      .post("http://localhost:27348/exercises/add", exercise)
      .then(() => console.log("Exercise added"))
      .catch((err) => console.log(err));

    // Redirect to homepage
    history.push("/");
  };

  return (
    // Exercise add form
    <div className={styles.AddExercise}>
      <h3>Add Exercise</h3>
      <form>
        <label htmlFor="users">Please select a user</label>
        <select
          name="add-exercise"
          id="users"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <label htmlFor="description">Name of exercise</label>
        <input
          type="text"
          name="add-exercise"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="duration">Duration (in minute)</label>
        <input
          type="number"
          name="add-exercise"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="submit"
          name="add-exercise"
          id="submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddExercise;
