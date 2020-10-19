import {Redirect} from 'react-router-dom';
import React from 'react';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export const WithAuthRedirect = (Component: any) => {

    const RedirectComponent = (props: any) => {
        if (!props.isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...props} />
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}