import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../config/store';

export const StoreProvider = ({ children }) => (<Provider store={store}>{children}</Provider>);
