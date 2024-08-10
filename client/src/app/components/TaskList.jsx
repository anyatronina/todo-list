import React from "react";
import { useSelector } from "react-redux";
import { getLoading, getScrolling, getTasks } from "../store/tasks";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Task from "./Task";
import Filters from "./Filters";

const TaskList = () => {
  const tasks = useSelector(getTasks());
  const isLoading = useSelector(getLoading());
  const isScrolling = useSelector(getScrolling());

  return (
    <>
      <Filters />
      {!isLoading && tasks ? (
        <>
          <div>
            {tasks.map((task) => (
              <Task task={task.attributes} id={task.id} key={task.id} />
            ))}
          </div>
          {isScrolling && (
            <Spin
              indicator={<LoadingOutlined spin />}
              size="large"
              style={{ width: "100%" }}
            />
          )}
        </>
      ) : (
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          style={{ width: "100%" }}
        />
      )}
    </>
  );
};

export default TaskList;
