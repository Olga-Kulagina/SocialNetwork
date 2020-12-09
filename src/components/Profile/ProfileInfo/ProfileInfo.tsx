import React, {ChangeEvent} from 'react'
import {Preloader} from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/avatar.png';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

type ProfileInfoProps = {
    profile: any
    status: string
    updateStatus: any
    isOwner: boolean
    savePhoto: any
}

const ProfileInfo = (props: ProfileInfoProps) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

        return (
            <div>
                <div>
                    <img src={props.profile.photos.large || userPhoto} alt={'user avatar'}/>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>

            </div>
        )
    }

export default ProfileInfo;