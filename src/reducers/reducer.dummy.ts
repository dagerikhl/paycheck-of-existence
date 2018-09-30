import { DummyAction } from '../actions/action.dummy';
import { DummyState, initialDummyState } from '../states/state.dummy';

export const dummyReducer = (state: DummyState = initialDummyState, action: DummyAction): DummyState => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                dummyMember: action.payload
            };
        default:
            return state;
    }
};
