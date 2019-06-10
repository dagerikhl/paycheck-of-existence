import * as React from 'react';

import { pickRandom } from '../../../helpers';

import './PageNotFound.css';

const messages = [
    'These aren\'t the droids you\'re looking for.',
    'Nothing to see here. Move along.',
    'Go about your business citizen.',
    'Where to now?',
    'You must gather your website contents before venturing forth.'
];

export const PageNotFound: React.SFC = () => {
    const message = pickRandom(messages);

    return (
        <section className="page-not-found">
            <span className="title">404</span>

            <h1 className="message">{message}</h1>
        </section>
    );
};
