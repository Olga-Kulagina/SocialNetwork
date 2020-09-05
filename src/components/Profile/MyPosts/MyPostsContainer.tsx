import React, {ChangeEvent, MouseEvent} from 'react'
import s from './MyPosts.module.css'
import {addPostActionCreator, updateNewTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {StorePropsType} from '../../../App';

const MyPostsContainer = (props: StorePropsType) => {
    const state = props.store.getState();

    let addPost = () => {
        let text = state.profilePage.newPostText
        props.store.dispatch(addPostActionCreator(text))
    }

    let updateNewPostText = (text: string) => {
        props.store.dispatch(updateNewTextActionCreator(text))
    }

    return (
        <MyPosts posts={state.profilePage.posts}
                 newPostText={state.profilePage.newPostText}
                 updateNewPostText={updateNewPostText}
                 addPost={addPost}/>
    )
}

export default MyPostsContainer;