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
}
export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _state: RootStateType
    addPost: (postMessage: string) => void
    updateNewPostText: (newText: string) => void
    rerenderEntireTree: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}


export type ActionsTypes = ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewTextActionCreator>;

export const addPostActionCreator = (postMessage: string) => {
    return {
        type: 'ADD-POST',
        postMessage: postMessage
    } as const
}

export const updateNewTextActionCreator = (newText: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}



let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are yoy?', likesCount: 28},
                {id: 2, message: 'How is your dissertation?', likesCount: 0},
                {id: 3, message: 'Yo Yo Yo', likesCount: 15},
                {id: 4, message: 'Blablabla', likesCount: 5},
            ],
            newPostText: '',

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
    },
    addPost(postMessage: string) {
        let newPost = {
            id: 5,
            message: postMessage,
            likesCount: 0
        };

        this._state.profilePage.posts.push(newPost);
        this.updateNewPostText('')
        this.rerenderEntireTree();
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this.rerenderEntireTree();
    },
    rerenderEntireTree() {
        console.log('State changed')
    },
    subscribe(observer) {
        this.rerenderEntireTree = observer;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        if (action.type === 'ADD-POST'){
            let newPost = {
                id: 5,
                message: action.postMessage,
                likesCount: 0
            };

            this._state.profilePage.posts.push(newPost);
            this.updateNewPostText('')
            this.rerenderEntireTree();
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this.rerenderEntireTree();
        }
    }
}




export default store;
