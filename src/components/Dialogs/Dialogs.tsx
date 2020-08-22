import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message';
import {DialogsPageType} from '../../redux/state';

const Dialogs: React.FC<DialogsPageType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem id={d.id} name={d.name}/>)
    let messagesElements = props.messages.map(m => <Message message={m.message} id={m.id}/>)

    let sendMessage = () => {
        alert('m')
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
                        <textarea></textarea>
                    </div>
                    <div>
                        <button onClick={sendMessage}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;