import React from 'react'
import s from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer';
import profileBckPicture from '../../assets/images/profile_bck_picture.jpg'
import userPhoto from '../../assets/images/avatar.png';
import {Preloader} from '../common/Preloader/Preloader';
import {ProfileType} from '../../redux/profile-reducer';
import {ProfileStatusWithHooks} from './ProfileInfo/ProfileStatusWithHooks';

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (newStatus: string) => void
    isOwner: boolean
    savePhoto: any
}


const Profile = (props: ProfilePropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profile}>
            <div className={s.profileHeader}>
                <div className={s.profileBackground}>
                    <img src={profileBckPicture} alt='space'/>
                    <div className={s.profileMenu}>

                    </div>
                </div>
                <div className={s.profileUser}>
                    <img src={props.profile.photos.large || userPhoto} alt={'user avatar'}/>
                    <p className={s.userName}>{props.profile.fullName}</p>
                    <p className={s.userStatus}><ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/></p>
                </div>
            </div>
            {/*{<ProfileInfo profile={props.profile} status={props.status} savePhoto={props.savePhoto}*/}
            {/*             isOwner={props.isOwner} updateStatus={props.updateStatus}/>}*/}
            <MyPostsContainer/>
        </div>
    )
}

export default Profile