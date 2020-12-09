import {getAuthUserDataThunkCreator} from './auth-reducer';

let initialState = {
    initialized: false
}

export type AuthStateType = typeof initialState

export const appReducer = (state = initialState, action: any): AuthStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}


export const initializedSuccess = () => ({type: 'APP/INITIALIZED_SUCCESS'})


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataThunkCreator())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })

}

