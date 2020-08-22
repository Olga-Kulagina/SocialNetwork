import React from 'react'
import s from './ProfileInfo.module.css'

function ProfileInfo() {
    return (
        <div>
            <div className={s.photo}>
                <img src='https://cs8.pikabu.ru/post_img/big/2016/06/23/6/1466672239198666433.png'/>
            </div>
            <div>
                ava+description
            </div>

        </div>
    )
}

export default ProfileInfo;