import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducer } from './reducers/reducer';

export const configureStore = () => createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);
