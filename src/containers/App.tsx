import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { withAuthentication } from '../components/higher-order/withAuthentication';
import { SiteFooter } from '../components/SiteFooter';
import { Routes } from '../constants/routes';
import { HomePage } from './HomePage';
import { HoursPage } from './HoursPage/HoursPage';
import { LoginPage } from './LoginPage/LoginPage';

import './App.css';

class AppComponent extends React.PureComponent {
    public render() {
        const footerLinks = [{ name: 'dagerikhl', url: 'https://github.com/dagerikhl' }];

        return (
            <div className="app">
                <header className="app-header">HEADER</header>

                <main className="app-main">
                    <Switch>
                        <Route exact path={Routes.LOGIN.path} component={LoginPage}/>
                        <Route exact path={Routes.HOME.path} component={HomePage}/>
                        <Route exact path={Routes.HOURS.path} component={HoursPage}/>
                        {/*<Route exact path={Routes.SUMMARY.path} component={SummaryPage}/>*/}
                    </Switch>
                </main>

                <footer className="app-footer">
                    <SiteFooter year="2018" name="Dag Erik Homdrum Løvgren" links={footerLinks}/>
                </footer>
            </div>
        );
    }
}

export const App = withRouter(withAuthentication(AppComponent));
