import React from 'react';
import {UsersType, UserType} from '../../redux/users-reducer';
import axios from 'axios'
import userPhoto from '../../assets/images/avatar.png'
import s from './Users.module.css'

type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}

class Users extends React.Component<UsersPropsType, any> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
        }
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render = () => {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {
                    pages.map((p, index) =>
                        <span key={index} className={p === this.props.currentPage ? s.selectedPage : ''}
                        onClick={() => {this.onPageChanged(p)}}>{p}</span>
                    )
                }
            </div>
            {
                this.props.users.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt='avatar'/>
                        </div>
                        <div>
                            {u.followed ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button> :
                                <button onClick={() => this.props.follow(u.id)}>Follow</button>}

                        </div>
                    </div>
                    <div>

                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                </div>)
            }
        </div>
    }
}

export default Users;