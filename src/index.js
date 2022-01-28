import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import createStore from "./store/store";
import {
    completeTask, createTask, deletedTask,
    getTasks,
    getTasksLoadingStatus,
    loadTasks,
    titleChangeTask
} from "./store/task";
import "./index.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = createStore();
const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (error.length !== 0) {
        return <p>{error}</p>
    }

    return (
        <>
            <h2>Hello redux!</h2>
            <ul>
                {state.map(el => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
                        <button onClick={() => dispatch(titleChangeTask(el.id))}>Change task</button>
                        <button onClick={() => dispatch(deletedTask(el.id))}>Delete task</button>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={() => dispatch(createTask({title: "New Task", completed: false}))}>New task</button>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
