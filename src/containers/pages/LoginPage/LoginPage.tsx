import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { LoginForm } from './LoginForm';

import './LoginPage.css';

const LoginPageComponent: React.SFC<RouteComponentProps> = ({ history }) => {
    return (
        <section className="login-page">
            <h1 className="title">Login</h1>

            <LoginForm history={history}/>
        </section>
    );
};

export const LoginPage = withRouter(LoginPageComponent);
