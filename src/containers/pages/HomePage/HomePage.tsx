import * as React from 'react';

import './HomePage.css';

class HomePageComponent extends React.PureComponent {
    public render() {
        return (
            <section className="home-page">
                <h1 className="title">Home page</h1>

                Content
            </section>
        );
    }
}

export const HomePage = HomePageComponent;
