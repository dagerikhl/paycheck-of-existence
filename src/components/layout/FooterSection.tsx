import * as React from 'react';

import './FooterSection.css';

interface OwnProps {
    title: string;
}

export const FooterSection: React.SFC<OwnProps> = ({ title, children }) => (
    <div className="footer-section">
        <h2 className="title">{title}</h2>

        <div className="section-wrapper">
            {children}
        </div>
    </div>
);
