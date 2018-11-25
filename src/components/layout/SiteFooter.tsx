import * as React from 'react';

import { Theme } from '../../enums';
import { ExternalRef } from '../../interfaces';
import { ExternalLink } from '../links/ExternalLink';

import './SiteFooter.css';

interface OwnProps {
    year: string;
    name: string;
    disclaimers?: string[];
    links?: ExternalRef[];
}

export const SiteFooter: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-footer">
        <div className="copyright">
            <span>&copy;</span> <span>{props.year}</span> <span>{props.name}</span>
        </div>

        {props.disclaimers && (
            <div className="disclaimers">
                <h3>Disclaimers</h3>

                {props.disclaimers.map((disclaimer, i) => <span key={i}>{disclaimer}</span>)}
            </div>
        )}

        {props.links && (
            <div className="links">
                <h3>Contact</h3>

                {props.links.map((link: ExternalRef, i) => {
                    return <span key={i}>{link.source}: <ExternalLink theme={Theme.ACCENT} externalRef={link}/></span>;
                })}
            </div>
        )}
    </div>
);
