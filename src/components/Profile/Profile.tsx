import React from 'react'
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../redux/state';

const Profile: React.FC<ProfilePageType> = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo />
            <MyPosts posts={props.posts} addPost={props.addPost}
                     newPostText={props.newPostText}
                     updateNewPostText={props.updateNewPostText}/>
        </div>
    )
}

export default Profile