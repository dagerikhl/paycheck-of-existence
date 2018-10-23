import * as React from 'react';

import { Theme } from '../constants/enums/Theme';
import { Link as ILink } from '../constants/interfaces/Link';

interface OwnProps {
    link: ILink;
    theme: Theme;
}

const LinkComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <a className={`link ${props.theme}`} href={props.link.url} target="_blank">{props.link.name}</a>
);

export const Link = LinkComponent;
