import {authAPI} from '../api/api';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}

export type AuthStateType = typeof initialState

export const authReducer = (state = initialState, action: any): AuthStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA',
    payload: {userId, email, login, isAuth}
})
export const getAuthUserDataThunkCreator = () => (dispatch: any) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    })
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserDataThunkCreator())
        }
    })
}

export const logoutThunkCreator = () => (dispatch: any) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    })
}