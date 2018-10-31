import { History } from 'history';
import * as React from 'react';

import { Button, ErrorMessage, Input, Loader } from '../../../components';
import { Routes } from '../../../constants';
import { auth } from '../../../services';

import './LoginForm.css';

interface OwnProps {
    history: History;
}

interface OwnState {
    email: string;
    password: string;
    isLoading: boolean;
    error?: any;
}

class LoginFormComponent extends React.PureComponent<OwnProps, OwnState> {
    public state: OwnState = {
        email: '',
        password: '',
        isLoading: false
    };

    public render() {
        const { email, password, isLoading, error } = this.state;

        const isMissingRequired = email === '';

        return (
            <React.Fragment>
                <form className="login-form" onSubmit={this.onSubmit}>
                    <Input
                        type="email"
                        placeholder="E-mail address"
                        value={email}
                        onChange={this.onEmailChange}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.onPasswordChange}
                    />

                    <Button type="submit" disabled={isMissingRequired}>Login</Button>

                    {error && <ErrorMessage message={error.message}/>}
                </form>

                {isLoading && <Loader/>}
            </React.Fragment>
        );
    }

    private onEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ email: e.currentTarget.value });
    };

    private onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ password: e.currentTarget.value });
    };

    private onSubmit = (e: React.FormEvent) => {
        const { history } = this.props;
        const { email, password } = this.state;

        this.setState({ isLoading: true });

        e.preventDefault();

        auth.login(email, password)
            .then(() => {
                history.push(Routes.HOME.path);
            })
            .catch((error) => {
                this.setState({ isLoading: false, error });
            });
    };
}

export const LoginForm = LoginFormComponent;
