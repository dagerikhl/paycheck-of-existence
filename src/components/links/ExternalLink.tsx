import * as React from 'react';

import { Theme } from '../../constants/enums/Theme';
import { ExternalRef } from '../../constants/interfaces/ExternalRef';

import './Link.css';

interface OwnProps {
    className?: string;
    theme?: Theme;
    externalRef: ExternalRef;
}

type ExternalLinkProps = OwnProps & React.HTMLProps<HTMLAnchorElement>;

const ExternalLinkComponent: React.SFC<ExternalLinkProps> = ({ className, theme, externalRef, ...rest }) => (
    <a
        className={`${className} link ${theme || Theme.NEUTRAL}`}
        href={externalRef.url}
        target={externalRef.openInWindow ? undefined : '_blank'}
        rel="noopener noreferrer"
        {...rest}
    >
        {externalRef.name}
    </a>
);

export const ExternalLink = ExternalLinkComponent;
