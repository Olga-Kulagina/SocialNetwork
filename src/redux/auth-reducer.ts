export type AuthStateType = {
    userId: number
    email: string
    login: string
    isAuth: boolean
}

let initialState: AuthStateType = {
    userId: 1,
    email: 'null',
    login: 'null',
    isAuth: false
}

export const authReducer = (state: AuthStateType = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number, email: string, login: string) => ({
    type: 'SET_USER_DATA',
    data: {userId, email, login}
})