import {AnyAction, applyMiddleware, combineReducers, createStore, Store} from 'redux';
import profileReducer, {
    addPostActionCreator, savePhotoSuccess,
    setStatus,
    setUserProfile
} from './profile-reducer';
import usersReducer from './users-reducer';
import {authReducer} from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {appReducer} from './app-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

export type PostType = {
    id: number
    message: string
    likesCount: number
    publishedTime: string
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    profile: object | null
}

export type RootStateType = {
    profilePage: ProfilePageType
}

export type StoreType = {
    _state: RootStateType
    rerenderEntireTree: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>;

let store: Store<any, AnyAction> = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;