import { AuthState } from './auth.state';
import { PeriodState } from './period.state';

export interface State {
    auth: AuthState;
    period: PeriodState;
}
