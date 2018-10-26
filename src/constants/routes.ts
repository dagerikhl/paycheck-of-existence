export interface Route {
    name: string;
    path: string;
}

interface Routes {
    LOGIN: Route;
    HOME: Route;
    HOURS: Route;
    SUMMARY: Route;
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
