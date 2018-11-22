import * as React from 'react';

import { ExternalRef, Theme } from '../../constants';
import { ExternalLink } from '../links/ExternalLink';

import './SiteFooter.css';

interface OwnProps {
    year: string;
    name: string;
    links?: ExternalRef[];
}

export const SiteFooter: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-footer">
        <div>
            <span>&copy;</span> <span>{props.year}</span> <span>{props.name}</span>
        </div>

        <div>
            {props.links && props.links.map((link: ExternalRef, i) => {
                return <ExternalLink theme={Theme.ACCENT} key={i} externalRef={link}/>;
            })}
        </div>
    </div>
);
