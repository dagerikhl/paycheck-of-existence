import * as React from 'react';

import { Theme } from '../../constants/enums/Theme';
import { Link } from '../../constants/interfaces/Link';
import { Href } from '../Href';

import './SiteFooter.css';

interface OwnProps {
    year: string;
    name: string;
    links?: Link[];
}

const SiteFooterComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-footer">
        <div>
            <span>&copy;</span> <span>{props.year}</span> <span>{props.name}</span>
        </div>

        <div>
            {props.links && props.links.map((link: Link, i) => <Href key={i} link={link} theme={Theme.SECONDARY}/>)}
        </div>
    </div>
);

export const SiteFooter = SiteFooterComponent;
