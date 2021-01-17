import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {PostType} from '../../../redux/redux-store';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {ProfileType} from '../../../redux/profile-reducer';
import userPhoto from '../../../assets/images/avatar.png';

type MyPostsPropsType = {
    addPost: (text: string) => void
    posts: Array<PostType>
    profile: ProfileType
}

const MyPosts = React.memo((props: MyPostsPropsType) => {


    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}
                                                   profile={props.profile} publishedTime={p.publishedTime}/>)


    let addPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div>
            <div className={s.addPostForm}>
                <img src={props.profile.photos.large || userPhoto} alt='author'/>
                <AddNewPostFormRedux onSubmit={addPost} />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength10 = maxLengthCreator(10)

type AddNewPostFormPropsType = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const AddNewPostForm = (props: AddNewPostFormPropsType) => {
    return (
            <form onSubmit={props.handleSubmit} className={s.form}>
                    <Field className={s.textarea} component={Textarea} name='newPostText' validate={[required, maxLength10]}
                           placeholder='Post message'/>
                    <button className={s.addPostBtn}>Add post</button>
            </form>
    )
}
const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts