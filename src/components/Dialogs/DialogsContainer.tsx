import React from 'react';
import s from './Dialogs.module.css'
import {
    sendMessageActionCreator,
    updateNewMessageBodyActionCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';
import {StorePropsType} from '../../App';

const DialogsContainer = (props: StorePropsType) => {

    const state = props.store.getState();

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreator(state.dialogsPage.newMessageBody))
    }

    let onNewMessageChange = (text: string) => {
        props.store.dispatch(updateNewMessageBodyActionCreator(text))
    }

    return (
        <Dialogs dialogs={state.dialogsPage.dialogs}
                 messages={state.dialogsPage.messages}
                 newMessageBody={state.dialogsPage.newMessageBody}
                 sendMessage={onSendMessageClick}
                 updateNewMessageBody={onNewMessageChange}/>
    )
}

export default DialogsContainer;