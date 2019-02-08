import { AuthState } from './auth.state';
import { ControlsState } from './controls.state';
import { HoursState } from './hours.state';

export interface State {
    auth: AuthState;
    controls: ControlsState;
    hours: HoursState;
}
