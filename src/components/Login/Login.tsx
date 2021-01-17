import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {loginThunkCreator} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';
import s from './Login.module.css'

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const Login: React.FC<LoginPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.loginContainer}>
            <div className={s.login}>
                <div className={s.loginText}>Login to your Account</div>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}


type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.loginForm}>
            <div>
                <Field className={s.inputFormControl}
                       placeholder={'Your Email'} name={'email'}
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <Field className={s.inputFormControl}
                       placeholder={'Your Password'} name={'password'} type='password'
                       validate={[required]} component={Input}/>
            </div>
            <div>
                <label className={s.checkbox}>
                    <Field component={Input} name={'rememberMe'} type={'checkbox'}/>
                    <div className={s.rememberMe}>
                        Remember me
                    </div>
                </label>
            </div>
            {props.error &&
            <div className={s.error}>
                {props.error}
            </div>}
            <div>
                <button className={s.loginBtn}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType>({
    form: 'login'
})(LoginForm)

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login: loginThunkCreator})(Login);