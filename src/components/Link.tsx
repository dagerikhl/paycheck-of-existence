import * as React from 'react';
import { Link as NavLink } from 'react-router-dom';

import { Theme } from '../constants/enums/Theme';
import { ExternalLink } from '../constants/interfaces/ExternalLink';
import { Route } from '../constants/routes';

import './Link.css';

interface OwnProps {
    className?: string;
    theme: Theme;
    externalLink?: ExternalLink;
    to?: Route;
}

type LinkProps = OwnProps & React.HTMLProps<HTMLAnchorElement>;

const LinkComponent: React.SFC<LinkProps> = ({ className, theme, externalLink, to, ...rest }) => {
    if (externalLink) {
        return (
            <a
                className={`${className} link ${theme}`}
                href={externalLink.url}
                target={externalLink.openInWindow ? undefined : '_blank'}
                {...rest}
            >
                {externalLink.name}
            </a>
        );
    }

    if (to) {
        return <NavLink
            className={`${className} link ${theme}`}
            to={to.path}
        >
            {to.name}
        </NavLink>;
    }

    return null;
};

export const Link = LinkComponent;
