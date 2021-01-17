import React from 'react';
import {UserType} from '../../redux/users-reducer';
import userPhoto from '../../assets/images/avatar.png'
import {NavLink} from 'react-router-dom';
import s from './Users.module.css'

type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({user, followingInProgress, follow, unfollow}) => {

    return (
        <div className={s.userCard}>
            <div className={s.userBackground}></div>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt='avatar'/>
                </NavLink>
            </div>
            <div className={s.userCardDescription}>
                <NavLink className={s.userName} to={'/profile/' + user.id}>
                    {user.name}
                </NavLink>
                <div>
                    {user.followed
                        ? <button className={s.followBtn} disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}
                        >Unfollow</button>
                        : <button className={s.followBtn} disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id)
                                }}
                        >Follow</button>}
                </div>
            </div>
        </div>
    )
}
