import React, {Component} from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios/axios-quiz';
import is from 'is_js';

export default class Auth extends Component {

    state = {
        isFormValid: false,
        successRegister: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите хотя бы 6 символов',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE78w5dxtUJLXY6jE8OTNl8EvliQDMGCs', authData);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBE78w5dxtUJLXY6jE8OTNl8EvliQDMGCs', authData);
            console.log(response);
            this.setState({
                successRegister: true,
            });
        } catch (e) {
            console.log(e);
        }
    };

    submitHandler = e => {
        e.preventDefault();
    };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (e, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({
            formControls, isFormValid
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    label={control.label}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    lanel={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>

                        {this.renderInputs()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>

                        {
                            this.state.successRegister
                                ? <h4>Вы успешно зарегистровались!</h4>
                                : null
                        }
                    </form>
                </div>
            </div>
        )
    }
}