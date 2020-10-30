import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import {
    DialogType,
    MessageType
} from '../../redux/redux-store';
import { Redirect } from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';

export type dialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody: string
    isAuth: boolean
    sendMessage: (newMessageBody: string) => void
}

const Dialogs = (props: dialogsPropsType) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
    let messagesElements = props.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)

    let addNewMessage = (values: any) => {

        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props: any) => {
    return (
        <form className={s.messageInput} onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessageBody' placeholder='Enter your message' />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;