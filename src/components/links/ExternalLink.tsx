import * as classNames from 'classnames';
import * as React from 'react';

import { ExternalRef, Theme } from '../../constants';

import './Link.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    externalRef: ExternalRef;
}

type ExternalLinkProps = OwnProps & React.HTMLProps<HTMLAnchorElement>;

export const ExternalLink: React.SFC<ExternalLinkProps> = ({ className, theme, externalRef, ...rest }) => (
    <a
        className={classNames({ [className as string]: className, 'link': true, [theme || Theme.NEUTRAL]: true })}
        href={externalRef.url}
        target={externalRef.openInWindow ? undefined : '_blank'}
        rel="noopener noreferrer"
        {...rest}
    >
        {externalRef.name}
    </a>
);
