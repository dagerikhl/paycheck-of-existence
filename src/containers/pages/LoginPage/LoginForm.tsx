import { History } from 'history';
import * as React from 'react';

import { Button } from '../../../components/Button';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { Input } from '../../../components/Input';
import { Loader } from '../../../components/Loader';
import { InputCellType, Routes } from '../../../constants';
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

export class LoginForm extends React.PureComponent<OwnProps, OwnState> {
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
                        type={InputCellType.EMAIL}
                        placeholder="E-mail address"
                        value={email}
                        onValueChange={this.onEmailChange}
                    />
                    <Input
                        type={InputCellType.PASSWORD}
                        placeholder="Password"
                        value={password}
                        onValueChange={this.onPasswordChange}
                    />

                    <Button type="submit" disabled={isMissingRequired}>Login</Button>

                    {error && <ErrorMessage message={error.message}/>}
                </form>

                {isLoading && <Loader text="Checking user credentials..."/>}
            </React.Fragment>
        );
    }

    private onEmailChange = (value: string) => {
        this.setState({ email: value });
    };

    private onPasswordChange = (value: string) => {
        this.setState({ password: value });
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
