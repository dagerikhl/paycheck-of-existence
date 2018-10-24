import * as React from 'react';

import { Theme } from '../constants/enums/Theme';
import { Link } from '../constants/interfaces/Link';

interface OwnProps {
    link: Link;
    theme: Theme;
    openInWindow?: boolean;
}

type HrefProps = OwnProps & React.HTMLProps<HTMLAnchorElement>;

const HrefComponent: React.SFC<HrefProps> = ({ link, theme, openInWindow, ...rest }) => (
    <a className={`g-link ${theme}`}
       href={link.url}
       target={openInWindow ? undefined : '_blank'}
       {...rest}
    >
        {link.name}
    </a>
);

export const Href = HrefComponent;
