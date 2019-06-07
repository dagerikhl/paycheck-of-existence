import * as classNames from 'classnames';
import * as React from 'react';

import { Theme } from '../../enums';
import { ExternalRef } from '../../types';

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
        href={externalRef.url + (externalRef.emailSubject ? `?subject=${externalRef.emailSubject}` : '')}
        target={externalRef.openInWindow ? undefined : '_blank'}
        rel="noopener noreferrer"
        {...rest}
    >
        {externalRef.name}
    </a>
);
