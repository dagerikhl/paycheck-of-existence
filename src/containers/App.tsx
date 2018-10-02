import * as React from 'react';
import { FormEvent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import DataSnapshot = firebase.database.DataSnapshot;

import './App.scss';

import { DummyAction, simpleAction } from '../actions/dummy.action';
import { fire } from '../database/fire';
import { State } from '../states/state';


// TODO Remove when actual routing is implemented
const dummyComponent = (title: string) => () => <div>{title}</div>;

interface OwnState {
    dummyMessage: string;
}

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

class AppComponent extends React.PureComponent<AppProps, OwnState> {
    public state: OwnState = {
        dummyMessage: ''
    };

    private dummyMessageInputElement: HTMLInputElement | null;

    public componentWillMount() {
        const dummyMessageRef = fire.database().ref('dummyMessage').orderByKey().limitToLast(100);
        dummyMessageRef.on('child_added', (snapshot: DataSnapshot) => {
            this.setState({ dummyMessage: snapshot.val() });
        });
    }

    public render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">Welcome to React</h1>
                </header>
                <p className="a">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>
                    Test text to see that Travis has deployed.
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

                {/* Firebase dummy */}
                <form onSubmit={this.addMessage}>
                    <div><p>{this.state.dummyMessage}</p></div>
                    <input type="text" ref={(element) => this.dummyMessageInputElement = element}/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }

    // Redux dummy function
    private handleOnClick = () => {
        this.props.simpleAction('a new dummy value');
    };

    // Firebase dummy function
    private addMessage = (e: FormEvent) => {
        e.preventDefault();

        if (this.dummyMessageInputElement) {
            fire.database().ref('dummyMessage').push(this.dummyMessageInputElement.value);
            this.dummyMessageInputElement.value = '';
        }
    };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
