import * as React from 'react';

import './HomePage.scss';

class HomePageComponent extends React.PureComponent {
    public render() {
        return (
            <section className="home">
                <h1>Home page</h1>
            </section>
        );
    }
}

export const HomePage = HomePageComponent;
