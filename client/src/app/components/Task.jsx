import React, { useState } from "react";
import { Card } from "antd";
import { Checkbox } from "antd";
import { DeleteOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteTask, favoriteTask, updateStatusTask } from "../store/tasks";
import localStorageService from "../services/localStorage.service";
import { useLocation } from "react-router-dom";

const Task = ({ task, id }) => {
  const { description, status } = task;
  const favoritesTask = localStorageService.getFavorites();
  const isCompleted = status === "completed";
  const [isFavorite, setFavorite] = useState(
    favoritesTask?.includes(id) ? true : false
  );
  const [isChecked, setChecked] = useState(isCompleted ? true : false);
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);
  const location = useLocation();

  const handleChange = () => {
    dispatch(
      updateStatusTask({
        id,
        body: {
          data: {
            task,
            status: isCompleted ? "notCompleted" : "completed",
          },
        },
      })
    );
    setChecked((prevState) => !prevState);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ id }));
  };

  const handleFavorites = () => {
    dispatch(favoriteTask({ id }));
    setFavorite((prevState) => !prevState);
    setIsDisplayed((prevState) => !prevState);
  };

  return (
    <Card
      className="card-task"
      style={{
        animation: `${
          !isDisplayed && location.search === "?status=favorites"
            ? "fade 0.5s ease forwards"
            : ""
        }`,
      }}
    >
      <Checkbox
        className="checkbox-task"
        checked={isChecked ? true : false}
        onChange={handleChange}
      />
      <div
        style={{
          textDecoration: `${isChecked ? "line-through" : ""}`,
          color: `${isChecked ? "#d6cccc" : ""}`,
          cursor: "pointer",
        }}
        onClick={handleChange}
      >
        {description}
      </div>
      <Button
        type="link"
        className="btn-task btn-task__delete"
        onClick={handleDelete}
      >
        <DeleteOutlined />
      </Button>

      <Button
        type="link"
        className="btn-task btn-task__favorites"
        onClick={handleFavorites}
      >
        {isFavorite ? <HeartFilled /> : <HeartOutlined />}
      </Button>
    </Card>
  );
};

export default Task;
