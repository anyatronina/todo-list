import { createSlice } from "@reduxjs/toolkit";
import taskService from "../services/task.service";
import localStorageService from "../services/localStorage.service";
import { getQueryParams } from "../utils/queryParams";

const initialState = {
  entities: null,
  pagination: null,
  isFetching: false,
  isScrolling: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskRequested: (state) => {
      state.error = null;
      state.isFetching = true;
    },
    taskUpdated: (state) => {
      state.error = null;
    },
    taskRequestSuccess: (state, action) => {
      state.entities = action.payload.data;
      state.pagination = action.payload.meta.pagination;
      state.isFetching = false;
    },
    taskRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
    taskUpdateSuccess: (state, action) => {
      state.isFetching = false;
    },
    taskScrollingRequest: (state, action) => {
      state.error = null;
      state.isScrolling = true;
    },
    taskScrollingRequestSuccess: (state, action) => {
      state.entities = [...state.entities, ...action.payload];
      state.isScrolling = false;
    },
  },
});

const { reducer: tasksReducer, actions } = tasksSlice;
const {
  taskRequested,
  taskRequestSuccess,
  taskRequestFailed,
  taskUpdated,
  taskUpdateSuccess,
  taskScrollingRequest,
  taskScrollingRequestSuccess,
} = actions;

export const loadTaskList = (payload) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    if (payload.status === "favorites") {
      const favoritesTask = localStorageService.getFavorites();
      const list = await taskService.get(getQueryParams(payload));

      dispatch(
        taskRequestSuccess(
          favoritesTask?.length
            ? {
                data: list.data
                  .filter((task) => favoritesTask?.includes(task.id))
                  .filter((task, i) => i < payload.pagination.pageSize),
                meta: {
                  pagination: {
                    page: payload.pagination.page,
                    pageSize: payload.pagination.pageSize,
                    pageCount: Math.ceil(
                      favoritesTask.length / payload.pagination.pageSize
                    ),
                    total: favoritesTask.length,
                  },
                },
              }
            : { data: [], meta: {} }
        )
      );
    } else {
      const list = await taskService.get(getQueryParams(payload));
      dispatch(taskRequestSuccess(list));
    }
  } catch (error) {
    console.log(error);
    dispatch(taskRequestFailed(error));
  }
};

export const addTask = (payload) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    await taskService.create(payload);

    const list = await taskService.get("");
    dispatch(taskRequestSuccess(list));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(taskRequestFailed(message));
  }
};

export const deleteTask = (payload) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    await taskService.delete(payload);

    const list = await taskService.get("");
    dispatch(taskRequestSuccess(list));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(taskRequestFailed(message));
  }
};

export const updateStatusTask = (payload) => async (dispatch) => {
  dispatch(taskUpdated());
  try {
    await taskService.update(payload);
    dispatch(taskUpdateSuccess());
  } catch (error) {
    const { message } = error.response.data;
    dispatch(taskRequestFailed(message));
  }
};

export const favoriteTask = (payload) => (dispatch) => {
  localStorageService.setFavorites(payload.id);
};

export const loadNewPageTask = (payload) => async (dispatch) => {
  dispatch(taskScrollingRequest());
  try {
    if (payload.status === "favorites") {
      const favoritesTask = localStorageService.getFavorites();
      const list = await taskService.get(getQueryParams(payload));

      dispatch(
        taskScrollingRequestSuccess(
          list.data
            .filter((task) => favoritesTask?.includes(task.id))
            .filter(
              (task, i) =>
                i >=
                  payload.pagination.pageSize * (payload.pagination.page - 1) &&
                i < payload.pagination.pageSize * payload.pagination.page
            )
        )
      );
    } else {
      const list = await taskService.get(getQueryParams(payload));
      dispatch(taskScrollingRequestSuccess(list.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(taskRequestFailed(error));
  }
};

export const getTasks = () => (state) => state.tasks.entities;
export const getLoading = () => (state) => state.tasks.isFetching;
export const getScrolling = () => (state) => state.tasks.isScrolling;
export const getPagination = () => (state) => state.tasks.pagination;

export default tasksReducer;
