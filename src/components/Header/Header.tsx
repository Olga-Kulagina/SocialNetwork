import React from 'react'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';

export type HeaderPropsType = {
    isAuth: boolean
    login: string
}

function Header(props: HeaderPropsType) {
    return (
        <header className={s.header}>
            <img src='https://svg-clipart.com/svg/yellow/8aCkhdK-lemon-slice-vector.svg'/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink> }

            </div>
        </header>
    )
}

export default Header