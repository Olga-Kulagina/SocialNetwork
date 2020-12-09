import React from 'react'
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

type ProfilePropsType = {
    profile: object
    status: string
    updateStatus: (newStatus: string) => void
    isOwner: boolean
    savePhoto: any
}


const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.profile}>
            {<ProfileInfo profile={props.profile} status={props.status} savePhoto={props.savePhoto}
                         isOwner={props.isOwner} updateStatus={props.updateStatus}/>}
            <MyPostsContainer/>
        </div>
    )
}

export default Profile