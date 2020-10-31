import React from 'react';
import s from './FormsControls.module.css'

export const Textarea = ({...props}) => {

    const hasError = props.meta.touched && props.meta.error

    return (
        <div className={s.formControl + " " + (hasError ? s.error : '')}>
            <div>
                <textarea {...props.input} {...props} />
            </div>
            { hasError && <span>{props.meta.error}</span>}
        </div>
    )
}
export const Input = ({...props}) => {

    const hasError = props.meta.touched && props.meta.error

    return (
        <div className={s.formControl + " " + (hasError ? s.error : '')}>
            <div>
                <input {...props.input} {...props} />
            </div>
            { hasError && <span>{props.meta.error}</span>}
        </div>
    )
}