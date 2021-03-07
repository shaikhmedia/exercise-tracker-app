import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Exercises from "./components/exercises/Exercises";
import AddExercise from "./components/addExercise/AddExercise";
import AddUser from "./components/addUser/AddUser";
import EditExercise from "./components/editExercise/EditExercise";

function App() {
  return (
    // App routes
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Exercises} />
        <Route path="/add-exercise" exact component={AddExercise} />
        <Route path="/add-user" exact component={AddUser} />
        <Route path="/edit/:id" exact component={EditExercise} />
      </div>
    </Router>
  );
}

export default App;
