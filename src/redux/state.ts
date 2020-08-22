

let rerenderEntireTree = () => {
    console.log('State changed')
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
    addPost: (postMessage: string) => void
    updateNewPostText: (newText: string) => void
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi! How are yoy?', likesCount: 28},
            {id: 2, message: 'How is your dissertation?', likesCount: 0},
            {id: 3, message: 'Yo Yo Yo', likesCount: 15},
            {id: 4, message: 'Blablabla', likesCount: 5},
        ],
        newPostText: '',
        addPost: (postMessage: string) => {
            let newPost = {
                id: 5,
                message: postMessage,
                likesCount: 0
            };

            state.profilePage.posts.push(newPost);
            state.profilePage.updateNewPostText('')
            rerenderEntireTree();
        },
        updateNewPostText: (newText: string) => {
            state.profilePage.newPostText = newText;
            rerenderEntireTree();
        }
    },
    dialogsPage: {
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
    },
}

export const subscribe = (observer: () => void) => {
    rerenderEntireTree = observer;
}


export default state;
