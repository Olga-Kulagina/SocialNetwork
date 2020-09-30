import React from 'react'
import Header from './Header';
import axios from 'axios';
import {setAuthUserData} from '../../redux/auth-reducer';
import {connect} from 'react-redux';

type HeaderContainerPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerPropsType, any> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)