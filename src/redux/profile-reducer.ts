import {ActionsTypes, PostType} from './redux-store';

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: { small: string | null, large: string | null }
}

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are yoy?', likesCount: 28},
        {id: 2, message: 'How is your dissertation?', likesCount: 0},
        {id: 3, message: 'Yo Yo Yo', likesCount: 15},
        {id: 4, message: 'Blablabla', likesCount: 5},
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null
}

export type ProfileStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsTypes): ProfileStateType => {
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
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}

export default profileReducer;