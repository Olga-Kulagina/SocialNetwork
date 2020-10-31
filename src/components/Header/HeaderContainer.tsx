import React from 'react'
import Header from './Header';
import {getAuthUserDataThunkCreator, logoutThunkCreator} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string | null
    getAuthUserData: () => void
    logout: () => void
}

class HeaderContainer extends React.Component<HeaderContainerPropsType, any> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthUserData: getAuthUserDataThunkCreator,
logout: logoutThunkCreator})(HeaderContainer)