import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {loginThunkCreator} from '../../redux/auth-reducer';
import {WithAuthRedirect} from '../../hoc/withAuthRedirect';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';

const LoginForm = (props: any) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Email'} name={'email'}
                           validate={[required]} component={Input} />
                </div>
                <div>
                    <Field placeholder={'Password'} name={'password'} type='password'
                           validate={[required]} component={Input}/>
                </div>
                <div>
                    <Field component={Input} name={'rememberMe'} type={'checkbox'}/> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}


const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login: loginThunkCreator})(Login);