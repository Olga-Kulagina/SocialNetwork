import {connect} from 'react-redux';
import {
    followThunkCreator, getUsersThunkCreator,
    setCurrentPage,
    toggleFollowingProgress, unfollowThunkCreator,
    UserType
} from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {AppStateType} from '../../redux/redux-store';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors';

type UsersContainerPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.getUsers(this.props.currentPage, this.props.pageSize)
        }
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render = () => {
        return <>
            {this.props.isFetching ? <Preloader/> : ''}
            <Users users={this.props.users}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   setCurrentPage={this.props.setCurrentPage}
                   onPageChanged={this.onPageChanged}
                   followingInProgress={this.props.followingInProgress}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default connect(mapStateToProps, {
    setCurrentPage,
    toggleFollowingProgress,
    getUsers: getUsersThunkCreator,
    unfollow: unfollowThunkCreator,
    follow: followThunkCreator
})(UsersContainer);