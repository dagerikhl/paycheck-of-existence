import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import './App.scss';

import { DummyAction, simpleAction } from './actions/action.dummy';
import logo from './logo.svg';
import { State } from './states/state.root';

// TODO Remove when actual routing is implemented
const dummyComponent = (title: string) => () => <div>{title}</div>;

interface StateProps {
    dummyMember: string;
}

const mapStateToProps = (state: State): StateProps => ({
    dummyMember: state.dummy.dummyMember
});

interface DispatchProps {
    simpleAction: (payload: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<DummyAction>): DispatchProps => bindActionCreators({
    simpleAction
}, dispatch);

type AppProps = StateProps & DispatchProps;

class App extends React.Component<AppProps> {
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

                {/* Redux dummy */}
                <button
                    onClick={this.handleOnClick}
                >
                    Press to test
                </button>
            </div>
        );
    }

    // Redux dummy function
    private handleOnClick = () => {
        this.props.simpleAction('a new dummy value');
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
