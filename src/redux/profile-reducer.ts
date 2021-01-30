import {PostType} from './redux-store';
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
    status?: string
}


export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof addLike>;

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are yoy?', likesCount: 28, publishedTime: '5 minutes ago'},
        {id: 2, message: 'How is your dissertation?', likesCount: 0, publishedTime: '1 hour ago'},
        {id: 3, message: 'Yo Yo Yo', likesCount: 15, publishedTime: '8 hours ago'},
        {id: 4, message: 'Blablabla', likesCount: 5, publishedTime: '15 hours ago'},
    ] as Array<PostType>,
    // @ts-ignore
    profile: null as ProfileType,
    status: ''
}

export type ProfileStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsTypes): ProfileStateType => {
    switch (action.type) {
        case 'P/ADD_POST': {
            let newPost = {
                id: 5,
                message: action.postMessage,
                likesCount: 0,
                publishedTime: '1 minute ago'
            };
            return {...state, posts: [newPost, ...state.posts]};
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
        case 'P/ADD_LIKE': {
            let stateCopy = {...state, posts: [...state.posts]}
            stateCopy.posts = stateCopy.posts.map(p => p.id === action.postId ? {...p, likesCount: p.likesCount + 1} : p)
            return stateCopy
        }
        default:
            return state;
    }
}

export const addLike = (postId: number) => {
    return {
        type: 'P/ADD_LIKE',
        postId
    } as const
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
export const savePhotoSuccess = (photos: { small: string | null, large: string | null }) => {
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
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export const savePhotoThunkCreator = (file: File) => (dispatch: any) => {
    return profileAPI.savePhoto(file).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    })
}

export default profileReducer;