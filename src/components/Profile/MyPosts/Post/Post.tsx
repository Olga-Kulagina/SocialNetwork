import React from 'react'
import s from './Post.module.css'

export type PostPropsType = {
    message: string
    likesCount: number
}

function Post(props: PostPropsType) {
    return (
        <div className={s.item}>
            <img src='https://www.kindpng.com/picc/m/41-415250_how-to-draw-pusheen-the-cat-cartoon-cat.png'/>
            {props.message}
            <div>
                <span>like: </span>{props.likesCount}
            </div>
        </div>
    )
}

export default Post