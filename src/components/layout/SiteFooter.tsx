import * as React from 'react';

import { Theme } from '../../constants/enums/Theme';
import { Link as ILink } from '../../constants/interfaces/Link';
import { Link } from '../Link';

import './SiteFooter.css';

interface OwnProps {
    year: string;
    name: string;
    links?: ILink[];
}

const SiteFooterComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <div className="site-footer">
        <div>
            <span>&copy;</span> <span>{props.year}</span> <span>{props.name}</span>
        </div>

        <div>
            {props.links && props.links.map((link: ILink, i) => <Link key={i} link={link} theme={Theme.SECONDARY}/>)}
        </div>
    </div>
);

export const SiteFooter = SiteFooterComponent;
