import React from 'react';
import {FilterType, UserType} from '../../redux/users-reducer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import s from './Users.module.css'
import {UsersSearchForm} from './UsersSearchForm/UsersSearchForm';

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
    onFilterChanged: (filter: FilterType) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

const Users: React.FC<UsersPropsType> = (props) => {

    return (
        <div>
            <div>
                <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            </div>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                       currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                       portionSize={10}/>
            <div className={s.users}>
                {
                    props.users.map(u => <User key={u.id} user={u}
                                               followingInProgress={props.followingInProgress}
                                               follow={props.follow} unfollow={props.unfollow}/>)
                }
            </div>
        </div>)
}

export default Users;