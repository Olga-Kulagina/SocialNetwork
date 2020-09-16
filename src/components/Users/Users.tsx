import React from 'react';
import {UsersType, UserType} from '../../redux/users-reducer';

type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

const Users = (props: UsersPropsType) => {

    if(props.users.length === 0) {
        props.setUsers(
            [
                {
                    id: 1,
                    followed: true,
                    fullName: 'Valentina',
                    status: 'I am a boss',
                    location: {city: 'Pjatigorsk', country: 'Russia'}
                },
                {
                    id: 2,
                    followed: false,
                    fullName: 'Tatiana',
                    status: 'Bla bla bla',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 3,
                    followed: true,
                    fullName: 'Jack',
                    status: 'Are you ok?',
                    location: {city: 'LA', country: 'USA'}
                },
            ]
        )
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <div>
                        <div>Ava</div>
                        <div>
                            {u.followed ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :
                                <button onClick={() => props.follow(u.id)}>Follow</button>}

                        </div>
                    </div>
                    <div>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users;