import createDataContext from "./createDataContext";
import greenverseApi from "../api/greenverse";

const taskReducer = (state, action) => {
  switch (action.type) {
    // case "create_task":
    //   return { ...state, tasks: [...state.tasks, action.payload] };
    case "fetch_tasks":
      return { tasks: [...action.payload] };
    default:
      return state;
  }
};

const enlistInTask = (dispatch) => async (id, email) => {
  try {
    const res = await greenverseApi.patch(`/task/${id}`, {
      peopleEnlisted: email,
    });
    console.log(res.data);
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
  { fetchTasks, createTask, enlistInTask },
  { tasks: [] }
);
