import * as React from 'react';

import { WithWorkdaysData } from './with-data/WithWorkdaysData';

export const withData = (dataString: string) => (Component: React.ComponentType) => {
    switch (dataString) {
        case 'workdays': {
            return () => <WithWorkdaysData Component={Component}/>;
        }
        default: {
            return () => <Component/>;
        }
    }
};
