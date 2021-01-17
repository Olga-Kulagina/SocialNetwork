import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';

type LocationType = {
    city: string
    country: string
}

type photosType = {
    small: string
    large: string
}

export type UserType = {
    id: number,
    followed: boolean,
    name: string,
    status: string,
    location: LocationType
    photos: photosType
}

export type FilterType = typeof initialState.filter

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: ''
    }
}

export type UsersStateType = typeof initialState

type ActionsTypes = ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setFilter>

const usersReducer = (state = initialState, action: ActionsTypes): UsersStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'USERS/SET-USERS':
            return {...state, users: action.users}
        case 'USERS/SET-FILTER':
            return {...state, filter: action.payload}
        case 'USERS/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'USERS/SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'USERS/TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId: number) => {
    return {
        type: 'USERS/FOLLOW',
        userId: userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: 'USERS/UNFOLLOW',
        userId: userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: 'USERS/SET-USERS',
        users: users
    } as const
}
export const setFilter = (term: string) => {
    return {
        type: 'USERS/SET-FILTER',
        payload: {term}
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'USERS/SET-CURRENT-PAGE',
        currentPage: currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'USERS/SET-TOTAL-USERS-COUNT',
        totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'USERS/TOGGLE-IS-FETCHING',
        isFetching
    } as const
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'USERS/TOGGLE-IS-FOLLOWING-PROGRESS',
        isFetching,
        userId
    } as const
}


export const getUsersThunkCreator = (currentPage: number, pageSize: number, term: string) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        dispatch(setFilter(term))
        usersAPI.getUsers(currentPage, pageSize, term).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })

    }
}

export const unfollowThunkCreator = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })

    }
}

export const followThunkCreator = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
    }
}


export default usersReducer;