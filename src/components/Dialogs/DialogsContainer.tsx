import React from 'react';
import s from './Dialogs.module.css'
import {
    sendMessageActionCreator,
    updateNewMessageBodyActionCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';



let mapStateToProps = (state: AppStateType) => {
    return (
        {
            dialogs: state.dialogsPage.dialogs,
            messages: state.dialogsPage.messages,
            newMessageBody: state.dialogsPage.newMessageBody
        }
    )
}

let mapDispatchToProps = (dispatch: any) => {
    return (
        {
            sendMessage: () => {dispatch(sendMessageActionCreator())},
            updateNewMessageBody: (text: string) => {dispatch(updateNewMessageBodyActionCreator(text))}
        }
    )
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;