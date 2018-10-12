import { History } from 'history';
import * as React from 'react';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Routes } from '../../constants/routes';
import { auth } from '../../services/auth';

interface OwnProps {
    history: History;
}

interface OwnState {
    email: string;
    password: string;
    error?: any;
}

class LoginFormComponent extends React.PureComponent<OwnProps, OwnState> {
    public state: OwnState = {
        email: '',
        password: ''
    };

    public render() {
        const { email, password, error } = this.state;

        const isMissingRequired = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="email"
                    placeholder="E-mail address"
                    value={email}
                    onChange={this.onEmailChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onPasswordChange}
                />

                <button type="submit" disabled={isMissingRequired}>Login</button>

                {error && <ErrorMessage message={error.message}/>}
            </form>
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

        e.preventDefault();

        auth.login(email, password)
            .then(() => {
                history.push(Routes.HOME.path);
            })
            .catch((error) => {
                this.setState({ error });
            });
    };
}

export const LoginForm = LoginFormComponent;
