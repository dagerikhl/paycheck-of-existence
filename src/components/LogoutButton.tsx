import * as React from 'react';

import { auth } from '../services/auth';

import './LogoutButton.css';

const LogoutButtonComponent = () => (
    <button
        className="logout-button"
        type="button"
        onClick={auth.logout}
    >
        Logout
    </button>
);

export const LogoutButton = LogoutButtonComponent;
