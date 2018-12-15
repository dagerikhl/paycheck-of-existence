import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { LoginForm } from './LoginForm';

import './LoginPage.css';

class LoginPageComponent extends React.PureComponent<RouteComponentProps> {
    public render() {
        const { history } = this.props;

        return (
            <section className="login-page">
                <h1>Login</h1>

                <LoginForm history={history}/>
            </section>
        );
    }
}

export const LoginPage = withRouter(LoginPageComponent);
