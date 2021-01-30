import React from 'react';
import {Chat} from './Chat';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';


export const ChatPage = () => {
    const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)


    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <Chat wsChannel={wsChannel}/>
        </div>
    )
}
