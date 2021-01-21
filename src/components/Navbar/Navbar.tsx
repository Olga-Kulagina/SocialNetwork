import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from 'react-router-dom';


function Navbar() {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' activeClassName={s.active}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/login' activeClassName={s.active}>Login</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/chat' activeClassName={s.active}>Chat</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;