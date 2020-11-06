import React from 'react'
import s from './ProfileInfo.module.css'
import {Preloader} from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/avatar.png';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

type ProfileInfoProps = {
    profile: any
    status: string
    updateStatus: any
}

function ProfileInfo(props: ProfileInfoProps) {

    if(!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            {/*<div className={s.photo}>
                <img src='https://cs8.pikabu.ru/post_img/big/2016/06/23/6/1466672239198666433.png'/>
            </div>*/}
            <div>
                <img src={props.profile.photos.large || userPhoto}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>

        </div>
    )
}

export default ProfileInfo;