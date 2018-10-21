import * as React from 'react';

import { Link as ILink } from '../interfaces/Link';
import { Link } from './Link';

import './SiteFooter.css';

interface OwnProps {
    year: string;
    name: string;
    links?: ILink[];
}

const SiteFooterComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="container">
        <div className="copyright">
            <span>&copy;</span>
            <span>{props.year}</span>
            <span>{props.name}</span>
        </div>

        <div className="links">
            {props.links && props.links.map((link: ILink, i) => <Link key={i} link={link}/>)}
        </div>
    </div>
);

export const SiteFooter = SiteFooterComponent;
