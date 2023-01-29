/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import sidebarReducer from './reducers/sidebar';
import promotionsReducer, { setPromotions } from './reducers/promotions';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        promotions: promotionsReducer,
    },
});

const ReduxProvider = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => ReduxProvider);
