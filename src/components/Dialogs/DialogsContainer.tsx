import React from 'react';
import s from './Dialogs.module.css'
import {
    sendMessageActionCreator,
    updateNewMessageBodyActionCreator
} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';



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

let AuthRedirectComponent = WithAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;