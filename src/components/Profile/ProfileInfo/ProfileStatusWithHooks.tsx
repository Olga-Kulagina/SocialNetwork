import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

export const ProfileStatusWithHooks = (props: PropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange =(e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onBlur={deactivateEditMode}
                       onChange={onStatusChange}
                       autoFocus={true}
                       type='text' value={status}/>
            </div>
            }
        </>
    )
}