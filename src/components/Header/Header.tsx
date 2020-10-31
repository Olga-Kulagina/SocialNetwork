import React from 'react'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';

export type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img src='https://svg-clipart.com/svg/yellow/8aCkhdK-lemon-slice-vector.svg'/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log Out</button></div> : <NavLink to={'/login'}>Login</NavLink> }

            </div>
        </header>
    )
}

export default Header