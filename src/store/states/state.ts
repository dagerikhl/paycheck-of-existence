import { AuthState } from './auth.state';
import { HoursState } from './hours.state';
import { PeriodState } from './period.state';

export interface State {
    auth: AuthState;
    period: PeriodState;
    hours: HoursState;
}
