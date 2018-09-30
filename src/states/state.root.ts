import { DummyState, initialDummyState } from './state.dummy';

export interface State {
    dummy: DummyState;
}

export const initialState: State = {
    dummy: initialDummyState
};
