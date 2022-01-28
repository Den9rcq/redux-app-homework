import taskReducer from "./task";
import { logger } from "./middleware/logger";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import errorReducer from "./errors";

const rootReducer = combineReducers({
    tasks: taskReducer,
    errors: errorReducer
})

function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(logger)),
        devTools: process.env.NODE_ENV !== 'production'
    })
}
export default createStore