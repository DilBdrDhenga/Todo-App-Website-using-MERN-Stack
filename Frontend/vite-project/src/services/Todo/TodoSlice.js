import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  title: "",
  description: "",
};

export const todoSlice = createSlice({
  name: "todo-list",
  initialState: initialStateValues,
  reducers: {},
});

export const {} = todoSlice.actions;
let todoReducer = todoSlice.reducer;
export default todoReducer;
