import { DummyAction } from '../actions/dummy.action';
import { DummyState, initialDummyState } from '../states/dummy.state';

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
