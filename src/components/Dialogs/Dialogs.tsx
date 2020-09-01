import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import {
    ActionsTypes,
    DialogType,
    MessageType, sendMessageActionCreator,
    updateNewMessageBodyActionCreator
} from '../../redux/state';

export type dialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
    dispatch: (action: ActionsTypes) => void
}

const Dialogs = (props: dialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem id={d.id} name={d.name}/>)
    let messagesElements = props.messages.map(m => <Message message={m.message} id={m.id}/>)

    let onSendMessageClick = () => {
        props.dispatch(sendMessageActionCreator(props.newMessageBody))
    }

    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageBodyActionCreator(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div className={s.messageInput}>
                    <div>
                        <textarea value={props.newMessageBody} onChange={onNewMessageChange}></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;