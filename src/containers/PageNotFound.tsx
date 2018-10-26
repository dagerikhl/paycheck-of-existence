import * as React from 'react';

import './PageNotFound.css';

class PageNotFoundComponent extends React.PureComponent {
    public render() {
        return (
            <section className="page-not-found">
                <span className="title">404</span>

                <h1>These aren't the droids you're looking for.</h1>
            </section>
        );
    }
}

export const PageNotFound = PageNotFoundComponent;
