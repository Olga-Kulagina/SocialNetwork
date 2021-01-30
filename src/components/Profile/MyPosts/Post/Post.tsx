import React from 'react'
import s from './Post.module.css'
import {addLike, ProfileType} from '../../../../redux/profile-reducer';
import userPhoto from '../../../../assets/images/avatar.png';
import like from '../../../../assets/images/hearts.png'
import comments from '../../../../assets/images/comment.png'
import share from '../../../../assets/images/share.png'
import {useDispatch} from 'react-redux';

export type PostPropsType = {
    message: string
    likesCount: number
    profile: ProfileType
    publishedTime: string
    postId: number
}

function Post(props: PostPropsType) {

    const dispatch = useDispatch()

    const setLike = (postId: number) => {
        dispatch(addLike(postId))
    }

    return (
        <div className={s.post}>
            <div className={s.author}>
                <div>
                    <img className={s.authorPhoto} src={props.profile.photos.small || userPhoto} alt={'author'}/>
                </div>
                <div className={s.authorInfo}>
                    <p className={s.authorName}>{props.profile.fullName}</p>
                    <p className={s.publishedTime}>{props.publishedTime}</p>
                </div>
            </div>
            <div className={s.postText}>
                <div>{props.message}</div>
                <div className={s.likesComments}>
                    <button className={s.likeBtn} onClick={() => setLike(props.postId)}><img src={like} alt='likes'/>
                    </button>
                    <span>{props.likesCount}</span>
                    <img src={comments} alt='comments'/>
                    <img src={share} alt='share'/>
                </div>
            </div>

        </div>
    )
}

export default Post