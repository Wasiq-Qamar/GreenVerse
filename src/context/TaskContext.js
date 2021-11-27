import createDataContext from "./createDataContext";
import greenverseApi from "../api/greenverse";

const taskReducer = (state, action) => {
  switch (action.type) {
    // case "create_task":
    //   return { ...state, tasks: [...state.tasks, action.payload] };
    case "fetch_tasks":
      return { tasks: [...action.payload] };
    case "fetch_my_tasks":
      return {
        myTasks: [...action.payload],
      };
    case "delete_tasks": {
      let result = state.tasks.filter((task) => task._id !== action.payload);
      return { tasks: result };
    }
    default:
      return state;
  }
};

const enlistInTask = (dispatch) => async (id, userId) => {
  try {
    const res = await greenverseApi.patch(`/task/${id}/enlist`, {
      userId,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = (dispatch) => async (id, callback) => {
  try {
    const res = await greenverseApi.delete(`/task/${id}`);
    dispatch({ type: "delete_tasks", payload: id });
    if (callback) {
      callback();
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchTasks = (dispatch) => async () => {
  try {
    const res = await greenverseApi.get("/tasks");
    dispatch({ type: "fetch_tasks", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

const fetchMyTasks = (dispatch) => async (userId) => {
  try {
    const res = await greenverseApi.get("/user/tasks");
    dispatch({ type: "fetch_my_tasks", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// const setMyTasks =
//   (dispatch) =>
//   async ({ taskId }) => {
//     dispatch({ type: "fetch_my_tasks", payload: taskId });
//   };

const createTask =
  (dispatch) =>
  async (
    {
      manager,
      taskName,
      campaign,
      location,
      peopleNeeded,
      description,
      fromTime,
      toTime,
      date,
    },
    callback
  ) => {
    try {
      const res = await greenverseApi.post("/task", {
        manager,
        taskName,
        campaign,
        location,
        peopleNeeded,
        description,
        fromTime,
        toTime,
        date,
      });
      // dispatch({ type: "create_task", payload: res.data });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };

export const { Context, Provider } = createDataContext(
  taskReducer,
  {
    fetchTasks,
    createTask,
    enlistInTask,
    deleteTask,
    fetchMyTasks,
  },
  { tasks: [], myTasks: [] }
);
