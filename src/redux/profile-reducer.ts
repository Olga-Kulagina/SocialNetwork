import {ActionsTypes, ProfilePageType} from './redux-store';

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are yoy?', likesCount: 28},
        {id: 2, message: 'How is your dissertation?', likesCount: 0},
        {id: 3, message: 'Yo Yo Yo', likesCount: 15},
        {id: 4, message: 'Blablabla', likesCount: 5},
    ],
    newPostText: '',
}

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 5,
                message: action.postMessage,
                likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case 'UPDATE_NEW_POST_TEXT':
            state.newPostText = action.newText;
            return state;
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

export default profileReducer;