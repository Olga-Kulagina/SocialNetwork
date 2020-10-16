import React from 'react'
import Header from './Header';
import {getAuthUserDataThunkCreator} from '../../redux/auth-reducer';
import {connect} from 'react-redux';

type HeaderContainerPropsType = {
    isAuth: boolean
    login: string
    getAuthUserData: () => void
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

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthUserData: getAuthUserDataThunkCreator})(HeaderContainer)