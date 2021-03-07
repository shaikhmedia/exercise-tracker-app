import axios from "axios";
import React, { useState } from "react";
import styles from "./addUser.module.css";

const AddUser = () => {
  const [username, setUsername] = useState("");

  // Submit new user to DB
  const handleSubmit = (e) => {
    e.preventDefault();

    // Newuser object
    const newUser = {
      username,
    };

    // Post new user to DB
    axios
      .post("http://localhost:27348/users/add", newUser)
      .then(() => console.log("User Added to DB"));

    // Redirect to homepage
    window.location = "/";
  };

  return (
    // User add form
    <div className={styles.AddUser}>
      <h3>Add a User</h3>
      <form>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="add-user"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" name="add-user" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default AddUser;
