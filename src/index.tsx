import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './containers/App';
import { registerServiceWorker } from './registerServiceWorker';
import { configureStore } from './store/store';

import 'normalize.css/normalize.css';
import './styles/globals.css';

ReactDOM.render(
    <Provider store={configureStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
