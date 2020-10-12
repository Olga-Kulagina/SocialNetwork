let initialState = {
    userId: 1 as number | null,
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