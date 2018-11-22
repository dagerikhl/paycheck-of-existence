import * as React from 'react';

import { pickRandomItem } from '../../../helpers';

import './PageNotFound.css';

export class PageNotFound extends React.PureComponent {
    private readonly messages = [
        'These aren\'t the droids you\'re looking for.',
        'Nothing to see here. Move along.',
        'Go about your business citizen.',
        'Where to now?',
        'You must gather your website contents before venturing forth.'
    ];

    private message: string;

    public componentWillMount() {
        this.message = pickRandomItem(this.messages);
    }

    public render() {
        return (
            <section className="page-not-found">
                <span className="title">404</span>

                <h1 className="message">{this.message}</h1>
            </section>
        );
    }
}
