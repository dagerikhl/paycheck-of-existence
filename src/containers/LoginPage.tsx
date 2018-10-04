import * as React from 'react';

import './Login.scss';

class LoginPageComponent extends React.PureComponent {
    public render() {
        return (
            <section className="login">
                <h1>Login page</h1>
            </section>
        );
    }
}

export const LoginPage = LoginPageComponent;
