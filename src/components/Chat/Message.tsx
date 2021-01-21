import React from 'react';

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const Message = (props: ChatMessageType) => {
    return (
        <div>
            <img src={props.photo} alt='avatar' style={{width: 30}}/> <b>{props.userName}</b>
            <br/>
            {props.message}
            <hr/>
        </div>
    )
}