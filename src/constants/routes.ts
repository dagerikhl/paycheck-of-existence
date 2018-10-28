export interface RouteRef {
    name: string;
    path: string;
}

interface Routes {
    LOGIN: RouteRef;
    HOME: RouteRef;
    HOURS: RouteRef;
    SUMMARY: RouteRef;
}

export const Routes: Routes = {
    LOGIN: {
        name: 'Login',
        path: '/login'
    },
    HOME: {
        name: 'Home',
        path: '/'
    },
    HOURS: {
        name: 'Hours',
        path: '/hours'
    },
    SUMMARY: {
        name: 'Summary',
        path: '/summary'
    }
};
