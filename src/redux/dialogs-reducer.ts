import {ActionsTypes, DialogsPageType} from './redux-store';

let initialState = {
    dialogs: [
        {id: 1, name: 'Kris'},
        {id: 2, name: 'Lena'},
        {id: 3, name: 'Karina'},
        {id: 4, name: 'Alena'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Where is your disk?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ],
    newMessageBody: ''
}

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'UPDATE_NEW_MESSAGE_BODY':
            state.newMessageBody = action.newMessageBody;
            return state;
        case 'SEND_MESSAGE':
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: 6, message: body})
            return state;
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