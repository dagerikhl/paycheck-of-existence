import { AuthState } from './auth.state';
import { ControlsState } from './controls.state';
import { HoursState } from './hours.state';
import { ProjectsState } from './projects.state';

export interface State {
    auth: AuthState;
    controls: ControlsState;
    hours: HoursState;
    projects: ProjectsState;
}
