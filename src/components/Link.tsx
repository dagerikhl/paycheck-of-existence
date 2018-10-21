import * as React from 'react';

import { Link as ILink } from '../interfaces/Link';

import './Link.css';

interface OwnProps {
    link: ILink;
}

const LinkComponent: React.SFC<OwnProps> = (props: OwnProps) => (
    <a className="link" href={props.link.url} target="_blank">{props.link.name}</a>
);

export const Link = LinkComponent;
