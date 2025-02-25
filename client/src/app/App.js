import React from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";
import Container from "./components/Container";

function App() {
  return (
    <Container>
      <NewTask />
      <TaskList />
    </Container>
  );
}

export default App;
