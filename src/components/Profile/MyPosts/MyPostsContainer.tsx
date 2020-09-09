import React, {ChangeEvent, MouseEvent} from 'react'
import s from './MyPosts.module.css'
import {addPostActionCreator, updateNewTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return (
        {
            posts: state.profilePage.posts,
            newPostText: state.profilePage.newPostText
        }
    )
}

let mapDispatchToProps = (dispatch: any) => {
    return (
        {
            updateNewPostText: (text: string) => {dispatch(updateNewTextActionCreator(text))},
            addPost: (text: string) => {dispatch(addPostActionCreator(text))
}
        }
    )
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;