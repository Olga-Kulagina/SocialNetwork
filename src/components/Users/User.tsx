import React from 'react';
import {UserType} from '../../redux/users-reducer';
import userPhoto from '../../assets/images/avatar.png'
import {NavLink} from 'react-router-dom';

type UserPropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({user, followingInProgress, follow, unfollow}) => {

    return (
        <>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} alt='avatar'/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)

                        }}>Unfollow</button> :
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }

                        }>Follow</button>}

                </div>
            </div>
            <div>

                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
        </>
    )
}
