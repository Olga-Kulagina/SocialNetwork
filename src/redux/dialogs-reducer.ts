import {ActionsTypes, DialogType, MessageType} from './redux-store';

let initialState = {
    dialogs: [
        {id: 1, name: 'Kris'},
        {id: 2, name: 'Lena'},
        {id: 3, name: 'Karina'},
        {id: 4, name: 'Alena'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Where is your disk?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ] as Array<MessageType>,
    newMessageBody: ''
}
export type DialogsStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): DialogsStateType => {
    switch (action.type) {
        case 'UPDATE_NEW_MESSAGE_BODY': {
            return {...state, newMessageBody: action.newMessageBody}
        }
        case 'SEND_MESSAGE': {
            let body = state.newMessageBody;
            return {...state, newMessageBody: '', messages: [...state.messages, {id: 6, message: body}]}
        }
        default:
            return state;
    }
}

export const sendMessageActionCreator = () => {
    return {
        type: 'SEND_MESSAGE'
    } as const
}
export const updateNewMessageBodyActionCreator = (newMessageBody: string) => {
    return {
        type: 'UPDATE_NEW_MESSAGE_BODY',
        newMessageBody: newMessageBody
    } as const
}

export default dialogsReducer;