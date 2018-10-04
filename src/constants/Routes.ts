interface Route {
    name: string;
    path: string;
}

interface Routes {
    [key: string]: Route;
}

export const Routes: Routes = {
    LOGIN: {
        name: 'Login',
        path: '/login'
    },
    ROOT: {
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
