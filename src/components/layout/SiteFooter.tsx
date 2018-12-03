import * as React from 'react';

import { Theme } from '../../enums';
import { ExternalRef } from '../../interfaces';
import { ExternalLink } from '../links/ExternalLink';

import './SiteFooter.css';

interface OwnProps {
    year: string;
    name: string;
    version?: string;
    disclaimers?: string[];
    links?: ExternalRef[];
}

export const SiteFooter: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-footer">
        <div className="copyright">
            <span>&copy;</span> <span>{props.year}</span> <span>{props.name}</span>
        </div>

        {props.version && (
            <div className="footer-section">
                <h2>Version</h2>

                <span className="version">{props.version}</span>
            </div>
        )}

        {props.disclaimers && (
            <div className="footer-section">
                <h2>Disclaimers</h2>

                {props.disclaimers.map((disclaimer, i) => <span key={i}>{disclaimer}</span>)}
            </div>
        )}

        {props.links && (
            <div className="footer-section">
                <h2>Contact</h2>

                {props.links.map((link: ExternalRef, i) => (
                    <span key={i}>{link.source}: <ExternalLink theme={Theme.ACCENT} externalRef={link}/></span>
                ))}
            </div>
        )}
    </div>
);
