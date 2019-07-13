import * as React from 'react';

import { pickRandom } from '../../../helpers';

import './PageNotFound.css';

const messages = [
    'These aren\'t the website contents you\'re looking for.',
    'Nothing to see here. Move along.',
    'Go about your business, citizen.',
    'Where to now?',
    'You must gather your website contents before venturing forth.',
    'What? Huh, must\'ve been the wind.',
    'I\'m sorry Dave, I\'m afraid I can\'t do that.',
    'I can neither confirm nor deny that this website exists.',
    'See no website contents, hear no website contents.'
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
