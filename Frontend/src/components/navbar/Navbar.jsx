import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const navbar = () => {
  return (
    // Navigation bar of the app
    <nav className={styles.Nav}>
      <h3>
        <Link className={styles.items} to="/">
          Exercise Tracker
        </Link>
      </h3>
      <ul>
        <li>
          <Link className={styles.items} to="/">
            Exercises
          </Link>
        </li>
        <li>
          <Link className={styles.items} to="/add-exercise">
            Add Exercise
          </Link>
        </li>
        <li>
          <Link className={styles.items} to="/add-user">
            Add User
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
