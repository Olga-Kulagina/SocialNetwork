import React, {useEffect, useState} from 'react';
import {Message, ChatMessageType} from './Message';
import s from './Message.module.css'

type ChatPropsType = {
    wsChannel: WebSocket
}

export const Chat = (props: ChatPropsType) => {

    return (
        <div>
            <Messages wsChannel={props.wsChannel}/>
            <AddMessageForm wsChannel={props.wsChannel}/>
        </div>
    )
}

export const Messages = (props: { wsChannel: WebSocket }) => {
    const [messages, setMessages] = useState<Array<ChatMessageType>>([])

    useEffect(() => {
        props.wsChannel.addEventListener('message', (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [props.wsChannel])

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} userId={m.userId} message={m.message}
                                                 photo={m.photo} userName={m.userName}/>)}
        </div>
    )
}
export const AddMessageForm = (props: { wsChannel: WebSocket }) => {

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if (!message) {
            return
        }
        props.wsChannel.send(message)
        setMessage('')
    }

    return (
        <div className={s.addMessageForm}>
            <div className={s.form}>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                className={s.textarea}></textarea>
                <button className={s.addMessageBtn} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}