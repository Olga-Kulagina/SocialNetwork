import {AnyAction, combineReducers, createStore, Store} from 'redux';
import profileReducer, {addPostActionCreator, updateNewTextActionCreator} from './profile-reducer';
import dialogsReducer, {sendMessageActionCreator, updateNewMessageBodyActionCreator} from './dialogs-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

export type PostType = {
    id: number
    message: string
    likesCount: number
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
    newPostText: string
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: RootStateType
    rerenderEntireTree: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewTextActionCreator> |
    ReturnType<typeof updateNewMessageBodyActionCreator> | ReturnType<typeof sendMessageActionCreator>;

let store: Store<any, AnyAction> = createStore(reducers);

export default store;