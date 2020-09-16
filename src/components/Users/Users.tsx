import React from 'react';
import {UsersType, UserType} from '../../redux/users-reducer';
import axios from 'axios'
import userPhoto from '../../assets/images/avatar.png'

type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

const Users = (props: UsersPropsType) => {
    if(props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.items)
        })
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt='avatar'/>
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
        </div>
    )
}

export default Users;