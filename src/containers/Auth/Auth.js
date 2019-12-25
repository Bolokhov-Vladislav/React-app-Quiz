import React, { Component } from 'react';
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";


class Auth extends Component {

    _login = () => {

    }
    _register = () => {

    }
    _submit = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this._submit} className={classes.AuthForm}>
                        <Input label='Email'/>
                        <Input label='Пароль'/>

                        <Button type='success' onClick={this._login}>Войти</Button>
                        <Button type='primary' onClick={this._register}>Регистрация</Button>
                    </form>
                </div>
            </div>
        );
    }
}



export default Auth;
