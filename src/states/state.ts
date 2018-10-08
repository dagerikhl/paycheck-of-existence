import { AuthState } from './auth.state';
import { DummyState } from './dummy.state';

export interface State {
    auth: AuthState;
    dummy: DummyState;
}
