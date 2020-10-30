import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {PostType} from '../../../redux/redux-store';
import {Field, reduxForm} from 'redux-form';

type MyPostsPropsType = {
    addPost: (text: string) => void
    posts: Array<PostType>
}

const MyPosts = (props: MyPostsPropsType) => {


    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)


    let addPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newPostText'/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts