import { combineReducers, configureStore } from "@reduxjs/toolkit"
import tokenReducer, { logout } from "../store/Slices/LoginSlice"
import userReducer from "../store/Slices/UserSlice"
import ProjectReducer from '../store/Slices/ProjectsSlice'
import MessagesReducer from "../store/Slices/MessagesSlice"
import SelectedMessageReducer from "../store/Slices/SelectedMessageSlice"
import selectedProjectReducer from "../store/Slices/SelectedProjectSlice"
import NotificationReducer from "../store/Slices/NotificationSlice"
import LoginSlice from "../store/Slices/LoginSlice"

const combinedReducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
    selectedMessage: SelectedMessageReducer,
    selectedProject: selectedProjectReducer,
    projects: ProjectReducer,
    messages: MessagesReducer,
    notifications: NotificationReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'token/logout') {
        state = undefined
    }
    return combinedReducer(state,action)
}

export const store = configureStore({
    reducer: rootReducer
})

