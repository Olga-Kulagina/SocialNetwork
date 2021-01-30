import React from 'react';
import s from './Message.module.css'
import {NavLink} from 'react-router-dom';

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const Message = (props: ChatMessageType) => {
    return (
        <div className={s.message}>
            <div>
                <img className={s.avatar} src={props.photo} alt='avatar'/>
            </div>
            <div className={s.nameAndText}>
                <div>
                    <NavLink to={'/profile/' + props.userId}
                             className={s.userName}>{props.userName}</NavLink>
                </div>
                <div className={s.messageText}>
                    {props.message}
                </div>
            </div>
        </div>
    )
}