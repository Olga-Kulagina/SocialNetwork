import {ActionsTypes, ProfilePageType} from './redux-store';

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi! How are yoy?', likesCount: 28},
        {id: 2, message: 'How is your dissertation?', likesCount: 0},
        {id: 3, message: 'Yo Yo Yo', likesCount: 15},
        {id: 4, message: 'Blablabla', likesCount: 5},
    ],
    newPostText: '',
    profile: null
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
                id: 5,
                message: action.postMessage,
                likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost], newPostText: ''};
        }
        case 'UPDATE_NEW_POST_TEXT': {
            return {...state, newPostText: action.newText};
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (postMessage: string) => {
    return {
        type: 'ADD_POST',
        postMessage: postMessage
    } as const
}
export const updateNewTextActionCreator = (newText: string) => {
    return {
        type: 'UPDATE_NEW_POST_TEXT',
        newText: newText
    } as const
}
export const setUserProfile = (profile: object) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}

export default profileReducer;