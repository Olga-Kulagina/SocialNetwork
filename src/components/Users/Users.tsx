import React from 'react';
import {UserType} from '../../redux/users-reducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';

type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    onPageChanged: (pageNumber: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

const Users: React.FC<UsersPropsType> = (props) => {

    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                       currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                       portionSize={10}/>
            {
                props.users.map(u => <User key={u.id} user={u}
                                           followingInProgress={props.followingInProgress}
                                           follow={props.follow} unfollow={props.unfollow}/>)
            }
        </div>)
}

export default Users;