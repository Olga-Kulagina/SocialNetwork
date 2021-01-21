import React, {useEffect, useState} from 'react';
import {Message, ChatMessageType} from './Message';
import {useFormik} from 'formik';

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
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}