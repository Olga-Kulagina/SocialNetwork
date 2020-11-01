import {usersAPI} from '../api/api';

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

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

export type UsersStateType = typeof initialState

const usersReducer = (state = initialState, action: any): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'SET-USERS':
            return {...state, users: action.users}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE-IS-FOLLOWING-PROGRESS': {
            return {...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)}
        }
        default:
            return state;
    }
}

export const followSuccess = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId: userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId: userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: 'SET-USERS',
        users: users
    } as const
}
export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage
    } as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        totalUsersCount
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        isFetching
    } as const
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => {
    return {
        type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
        isFetching,
        userId
    } as const
}


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })

    }
}

export const unfollowThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId).then(response => {
            if (response.data.resultCode === 0){
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })

    }
}

export const followThunkCreator = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId).then(response => {
            if (response.data.resultCode === 0){
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
        })
    }
}



export default usersReducer;