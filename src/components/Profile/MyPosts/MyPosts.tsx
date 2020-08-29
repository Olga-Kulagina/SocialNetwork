import React, {ChangeEvent, MouseEvent} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {ProfilePropsType} from '../Profile';

const MyPosts = (props: ProfilePropsType) => {


    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)


    let addPost = () => {
        let text = props.newPostText
        props.dispatch({type: 'ADD-POST', postMessage: text})
    }

    let updateNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: e.currentTarget.value})
    }

    return (
            <div>
                <h3>My posts</h3>
                <div>
                    <div>
                        <textarea onChange={updateNewPostText} value={props.newPostText} />
                    </div>
                    <div>
                        <button onClick={addPost}>Add post</button>
                    </div>
                </div>
                <div className={s.posts}>
                    {postsElements}
                </div>

            </div>
    )
}

export default MyPosts