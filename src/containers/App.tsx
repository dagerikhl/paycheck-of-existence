import * as React from 'react';
import { FormEvent } from 'react';
import { connect } from 'react-redux';
import { Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { updateAuthUser } from '../actions/auth.action';
import { DummyAction, simpleAction } from '../actions/dummy.action';
import { auth } from '../auth/auth';
import { LogoutButton } from '../components/LogoutButton';
import { Routes } from '../constants/routes';
import { firebaseDatabase } from '../firebase/firebase';
import { AuthUser } from '../interfaces/AuthUser';
import { State } from '../states/state';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage/LoginPage';

import './App.css';

// TODO Remove when actual routing is implemented
const dummyComponent = (title: string) => () => <div>{title}</div>;

interface OwnState {
    dummyMessage: string;
}

interface StateProps {
    authUser: AuthUser | null;
    dummyMember: string;
}

const mapStateToProps = (state: State): StateProps => ({
    authUser: state.auth.authUser,
    dummyMember: state.dummy.dummyMember
});

interface DispatchProps {
    updateAuthUser: (authUser: AuthUser | null) => void;
    simpleAction: (payload: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<DummyAction>): DispatchProps => bindActionCreators({
    updateAuthUser,
    simpleAction
}, dispatch);

type AppProps = StateProps & DispatchProps & RouteComponentProps;

class AppComponent extends React.PureComponent<AppProps, OwnState> {
    public state: OwnState = {
        dummyMessage: ''
    };

    private dummyMessageInputElement: HTMLInputElement | null;

    public componentWillMount() {
        const dummyMessageRef = firebaseDatabase.ref('dummyMessage').orderByKey().limitToLast(100);
        dummyMessageRef.on('child_added', (snapshot: any) => {
            this.setState({ dummyMessage: snapshot.val() });
        });
    }

    public componentDidMount() {
        auth.onAuthUserUpdate((authUser: AuthUser) => this.props.updateAuthUser(authUser));
    }

    public render() {
        const { authUser } = this.props;

        const navOptions = authUser
            ? (<ul>
                <li><Link to={Routes.HOME.path}>{Routes.HOME.name}</Link></li>
                <li><Link to={Routes.HOURS.path}>{Routes.HOURS.name}</Link></li>
                <li><Link to={Routes.SUMMARY.path}>{Routes.SUMMARY.name}</Link></li>
                <li><LogoutButton/></li>
            </ul>)
            : (<ul>
                <li><Link to={Routes.HOME.path}>{Routes.HOME.name}</Link></li>
                <li><Link to={Routes.LOGIN.path}>{Routes.LOGIN.name}</Link></li>
            </ul>);

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
                <nav>
                    {navOptions}
                </nav>

                <Switch>
                    <Route exact path={Routes.LOGIN.path} component={LoginPage}/>
                    <Route exact path={Routes.HOME.path} component={HomePage}/>
                    <Route exact path={Routes.HOURS.path} render={dummyComponent(Routes.HOURS.name)}/>
                    <Route exact path={Routes.SUMMARY.path} render={dummyComponent(Routes.SUMMARY.name)}/>
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
            firebaseDatabase.ref('dummyMessage').push(this.dummyMessageInputElement.value);
            this.dummyMessageInputElement.value = '';
        }
    };
}

export const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent));
