import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { withAuthentication } from '../components/higher-order/withAuthentication';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { Routes } from '../constants';
import { HomePage } from './pages/HomePage/HomePage';
import { HoursPage } from './pages/HoursPage/HoursPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

import './App.css';

class AppComponent extends React.PureComponent {
    private readonly disclaimers = [
        'Date collected? None.',
        'Terms of Use? None. TL;DR: None.',
        'Dark pacts made by visiting site? "None".'
    ];
    private readonly contactLinks = [
        {
            name: 'dagerikhl',
            url: 'https://github.com/dagerikhl',
            source: 'GitHub'
        },
        {
            name: 'dagerikhl@gmail.com',
            url: 'mailto:dagerikhl@gmail.com',
            source: 'E-mail',
            emailSubject: 'Regarding Paycheck of Existence'
        }
    ];

    public render() {
        return (
            <div className="app">
                <header className="header">
                    <SiteHeader title="Paycheck of Existence"/>
                </header>

                <main className="main">
                    <Switch>
                        <Route exact path={Routes.LOGIN.path} component={LoginPage}/>
                        <Route exact path={Routes.HOME.path} component={HomePage}/>
                        <Route exact path={Routes.HOURS.path} component={HoursPage}/>
                        <Route component={PageNotFound}/>
                        {/*<Route exact path={Routes.SUMMARY.path} component={SummaryPage}/>*/}
                    </Switch>
                </main>

                <footer className="footer">
                    <SiteFooter
                        year="2018"
                        name="Dag Erik Homdrum Løvgren"
                        disclaimers={this.disclaimers}
                        links={this.contactLinks}
                    />
                </footer>
            </div>
        );
    }
}

export const App = withRouter(withAuthentication(AppComponent));
