import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './LoginPage.css';

import { LoginForm } from './LoginForm';

class LoginPageComponent extends React.PureComponent<RouteComponentProps> {
    public render() {
        const { history } = this.props;

        return (
            <section className="login">
                <h1>Login page</h1>

                <LoginForm history={history}/>
            </section>
        );
    }
}

export const LoginPage = withRouter(LoginPageComponent);
