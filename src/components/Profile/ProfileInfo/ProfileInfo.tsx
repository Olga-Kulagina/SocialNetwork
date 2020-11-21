import React from 'react'
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
            <div>
                <img src={props.profile.photos.large || userPhoto} alt={'user avatar'}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>

        </div>
    )
}

export default ProfileInfo;