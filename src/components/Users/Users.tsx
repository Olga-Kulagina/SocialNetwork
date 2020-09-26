import React from 'react';
import {UserType} from '../../redux/users-reducer';
import userPhoto from '../../assets/images/avatar.png'
import s from './Users.module.css'
import {NavLink} from 'react-router-dom';

type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    onPageChanged: (pageNumber: number) => void
}

const Users = (props: UsersPropsType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {
                    pages.map((p, index) =>
                        <span key={index} className={p === props.currentPage ? s.selectedPage : ''}
                              onClick={() => {
                                  props.onPageChanged(p)
                              }}>{p}</span>
                    )
                }
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt='avatar'/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :
                                <button onClick={() => props.follow(u.id)}>Follow</button>}

                        </div>
                    </div>
                    <div>

                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                </div>)
            }
        </div>)
}

export default Users;