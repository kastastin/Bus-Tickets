import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loadersSlice from "./loadersSlice";
import usersSlice from "./usersSlice";

const rootReducer = combineReducers({
  loaders: loadersSlice,
  users: usersSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
