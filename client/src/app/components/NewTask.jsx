import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasks";
import { useHistory } from "react-router-dom";

const NewTask = () => {
  const [newTask, setTask] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddTask = () => {
    dispatch(
      addTask({
        data: {
          title: "",
          description: newTask,
          status: "notCompleted",
        },
      })
    );
    setTask("");
  };

  return (
    <Space.Compact style={{ width: "100%", marginBottom: "20px" }}>
      <Input
        placeholder="Новая задача"
        value={newTask}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button type="primary" onClick={handleAddTask}>
        Добавить
      </Button>
    </Space.Compact>
  );
};

export default NewTask;
