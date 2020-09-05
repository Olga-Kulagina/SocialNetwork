import React from 'react'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {StorePropsType} from '../../App';


const Profile = (props: StorePropsType) => {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
            />
        </div>
    )
}

export default Profile