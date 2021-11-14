import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType, TaskItem } from "./types";

export const toDoSlice = createSlice({
  name: "todoItem",
  initialState: { tasks: [], tasksDone: [] } as StateType,
  reducers: {
    loadState: (_, { payload }: PayloadAction<StateType>) => {
      return payload;
    },
    addTask: (
      state,
      { payload }: PayloadAction<Pick<TaskItem, "name" | "description">>
    ) => {
      state.tasks.unshift({
        id: Date.now(),
        name: payload.name,
        description: payload.description,
        date: Date.now(),
      });
    },
    remove: (
      state,
      { payload }: PayloadAction<{ id: number; done: boolean }>
    ) => {
      const listName = payload.done ? "tasksDone" : "tasks";
      const list = state[listName];
      const index = list.findIndex(({ id }) => id === payload.id);

      if (index !== -1) {
        list.splice(index, 1);
      }
    },
    update: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: number;
        done: boolean;
        name: string;
        description: string;
      }>
    ) => {
      const listName = payload.done ? "tasksDone" : "tasks";
      const list = state[listName];
      const index = list.findIndex(({ id }) => id === payload.id);

      if (index !== -1) {
        const item = list[index];
        item.name = payload.name;
        item.description = payload.description;
        item.date = Date.now();
      }
    },
    toggleDone: (
      state,
      { payload }: PayloadAction<{ id: number; done: boolean }>
    ) => {
      const listName = payload.done ? "tasksDone" : "tasks";
      const listNameAnother = payload.done ? "tasks" : "tasksDone";

      const list = state[listName];
      const listAnother = state[listNameAnother];

      const index = list.findIndex(({ id }) => id === payload.id);

      if (index !== -1) {
        const item = list[index];
        list.splice(index, 1);
        listAnother.splice(1, 0, item);
      }
    },
  },
});

export const { loadState, addTask, remove, update, toggleDone } =
  toDoSlice.actions;

export default toDoSlice.reducer;
