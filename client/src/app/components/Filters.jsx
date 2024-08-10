import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPagination, loadNewPageTask, loadTaskList } from "../store/tasks";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Filters = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isBottom, setIsBottom] = useState(false);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(location.search.split("=")[1]);
  const metaPagination = useSelector(getPagination());

  const handleLoad = (payload) => {
    setPage(1);
    setIsBottom(false);
    setStatus(payload);

    history.push(payload ? `/?status=${payload}` : "");
  };

  useEffect(() => {
    dispatch(
      loadTaskList({
        status,
        pagination: { page, pageSize },
      })
    );

    // из-за дабл ре-рендера запроса
    // setPage((prevState) => prevState + 1);

    setPage(2);
  }, [location.search]);

  useEffect(() => {
    if (isBottom && page <= metaPagination.pageCount) {
      dispatch(
        loadNewPageTask({
          status,
          pagination: { page, pageSize },
        })
      );

      setPage((prevState) => prevState + 1);
      setIsBottom(false);
    }
  }, [isBottom]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        setIsBottom(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ marginBottom: "10px" }}>
      <Button
        style={{ marginRight: "3px" }}
        type={!location.search ? "primary" : ""}
        onClick={() => handleLoad()}
      >
        Все
      </Button>
      <Button
        style={{ marginRight: "3px" }}
        type={location.search === "?status=completed" ? "primary" : ""}
        onClick={() => handleLoad("completed")}
      >
        Выполненные
      </Button>
      <Button
        style={{ marginRight: "3px" }}
        type={location.search === "?status=notCompleted" ? "primary" : ""}
        onClick={() => handleLoad("notCompleted")}
      >
        Невыполненные
      </Button>
      <Button
        type={location.search === "?status=favorites" ? "primary" : ""}
        onClick={() => handleLoad("favorites")}
      >
        Избранные
      </Button>
    </div>
  );
};

export default Filters;
