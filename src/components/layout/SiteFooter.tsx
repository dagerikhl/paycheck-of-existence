import * as React from 'react';

import { Theme } from '../../enums';
import { ExternalRef } from '../../types';
import { ExternalLink } from '../links/ExternalLink';
import { FooterSection } from './FooterSection';

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
            <FooterSection title="Version">
                <div className="version">{props.version}</div>
            </FooterSection>
        )}

        {props.links && (
            <FooterSection title="Contact">
                {props.links.map((link: ExternalRef, i) => (
                    <div key={i}><ExternalLink theme={Theme.ACCENT} externalRef={link}/></div>
                ))}
            </FooterSection>
        )}

        {props.disclaimers && (
            <FooterSection title="Disclaimers">
                {props.disclaimers.map((disclaimer, i) => <div key={i}>{disclaimer}</div>)}
            </FooterSection>
        )}
    </div>
);
