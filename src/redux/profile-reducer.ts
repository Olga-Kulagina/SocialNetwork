import {ActionsTypes, PostType} from './redux-store';
import {profileAPI} from '../api/api';

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are yoy?', likesCount: 28},
        {id: 2, message: 'How is your dissertation?', likesCount: 0},
        {id: 3, message: 'Yo Yo Yo', likesCount: 15},
        {id: 4, message: 'Blablabla', likesCount: 5},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type ProfileStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsTypes): ProfileStateType => {
    switch (action.type) {
        case 'P/ADD_POST': {
            let newPost = {
                id: 5,
                message: action.postMessage,
                likesCount: 0
            };
            return {...state, posts: [...state.posts, newPost]};
        }
        case 'P/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'P/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'P/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (postMessage: string) => {
    return {
        type: 'P/ADD_POST',
        postMessage: postMessage
    } as const
}
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: 'P/SET_USER_PROFILE',
        profile
    } as const
}
export const setStatus = (status: string) => {
    return {
        type: 'P/SET_STATUS',
        status
    } as const
}
export const savePhotoSuccess = (photos: { small: string | null, large: string | null}) => {
    return {
        type: 'P/SAVE_PHOTO_SUCCESS',
        photos
    } as const
}
export const getUserProfileThunkCreator = (userId: number) => (dispatch: any) => {
    return profileAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}
export const getStatusThunkCreator = (userId: number) => (dispatch: any) => {
    return profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}
export const updateStatusThunkCreator = (status: string) => (dispatch: any) => {
    return profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export const savePhotoThunkCreator = (file: File) => (dispatch: any) => {
    return profileAPI.savePhoto(file).then(response => {
        if(response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    })
}

export default profileReducer;