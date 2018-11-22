import * as React from 'react';

import logo from '../../../images/logo.svg';

import './HomePage.css';

export class HomePage extends React.PureComponent {
    public render() {
        return (
            <section className="home-page">
                <h1 className="title">Home</h1>

                <img className="logo" src={logo} alt="Logo"/>

                <div className="message">
                    Welcome to Paycheck of Existence! If you are me, that is.
                    <br/>
                    <br/>
                    If not, please go away. But know that you are loved.
                </div>
            </section>
        );
    }
}
