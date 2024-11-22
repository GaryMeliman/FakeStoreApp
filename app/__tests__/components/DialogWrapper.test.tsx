import { configureStore, Store } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import DialogWrapper from '../../components/DialogWrapper';
import dialogReducer from '../../redux/dialogSlice';
import { RootState } from "../../redux/store";
import userReducer from '../../redux/userSlice';


describe('DialogWrapper Component', () => {

    jest.mock("react-native-paper");

    let store: Store<RootState>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                dialog: dialogReducer,
                user: userReducer
            },
            preloadedState: {
                dialog: {
                    title: 'Test Title',
                    details: 'Test details content.',
                },
            },
        });
    });

    it('renderea el dialog con el title y details correctos', () => {
        render(
            <ReduxProvider store={store}>
                <PaperProvider>
                    <DialogWrapper />
                </PaperProvider>
            </ReduxProvider>
        );
        expect(screen.getByText('Test Title')).toBeTruthy();
        expect(screen.getByText('Test details content.')).toBeTruthy();
    });

    it('despacha setDialog cuando el boton "Ok" es precionado', async () => {
        render(
            <ReduxProvider store={store}>
                <PaperProvider>
                    <DialogWrapper />
                </PaperProvider>
            </ReduxProvider>
        );
        fireEvent.press(screen.getByText('Ok'));
        await waitFor(() => {
            const state = store.getState();
            expect(state.dialog).toEqual({ title: '', details: '' });
        });
    });
});
