import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

import logo from './logo.svg';

// TODO Remove when actual routing is implemented
const dummyComponent = (title: string) => () => <div>{title}</div>;

class App extends React.Component {
    public render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo"/>
                    <h1 className="app-title">Welcome to React</h1>
                </header>
                <p className="a">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>

                {/* Router dummy */}
                <Switch>
                    <Route exact path="/hours" render={dummyComponent('Hours')}/>
                    <Route exact path="/summary" render={dummyComponent('Summary')}/>
                </Switch>
            </div>
        );
    }
}

export default App;
