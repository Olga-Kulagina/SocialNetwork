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
            <div className={s.logoBlock}>
                <div>
                    <img src='https://svg-clipart.com/svg/yellow/8aCkhdK-lemon-slice-vector.svg'
                         alt={'social network logo'}/>
                </div>
                <div>Social Network</div>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login}
                        <button className={s.logoutBtn} onClick={props.logout}>Log Out</button>
                    </div> :
                    <NavLink to={'/login'}>
                        <button className={s.logoutBtn}>Log In</button>
                    </NavLink>}
            </div>
        </header>
    )
}

export default Header