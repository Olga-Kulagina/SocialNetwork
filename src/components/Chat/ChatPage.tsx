import React from 'react';
import {Chat} from './Chat';

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export const ChatPage = () => {
    return (
        <div>
            <Chat wsChannel={wsChannel}/>
        </div>
    )
}
