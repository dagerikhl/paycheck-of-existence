import * as React from 'react';

import { Theme } from '../../constants/enums/Theme';
import { ExternalLink } from '../../constants/interfaces/ExternalLink';
import { Link } from '../Link';

import './SiteFooter.css';

interface OwnProps {
    year: string;
    name: string;
    links?: ExternalLink[];
}

const SiteFooterComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-footer">
        <div>
            <span>&copy;</span> <span>{props.year}</span> <span>{props.name}</span>
        </div>

        <div>
            {props.links && props.links.map((link: ExternalLink, i) => {
                return <Link theme={Theme.ACCENT} key={i} externalLink={link}/>;
            })}
        </div>
    </div>
);

export const SiteFooter = SiteFooterComponent;
