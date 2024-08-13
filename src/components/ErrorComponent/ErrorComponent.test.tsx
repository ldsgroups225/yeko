import { fireEvent, render } from '@testing-library/react-native';
import { atom, createStore, Provider } from 'jotai';
import React from 'react';
import ErrorComponent from './index';

const userColorSchemeAtom = atom('light');

const myStore = createStore();
myStore.set(userColorSchemeAtom, 'light');

describe('ErrorComponent', () => {
  test('renders error message correctly', () => {
    const errorMessage = 'Something went wrong';
    const { getByText } = render(
      <Provider store={myStore}>
        <ErrorComponent errorMessage={errorMessage} />
      </Provider>
    );
    const messageElement = getByText(errorMessage);
    expect(messageElement).toBeTruthy();
  });

  test('calls onRetry function when retry button is pressed', () => {
    const onRetryMock = jest.fn();
    const { getByText } = render(<ErrorComponent onRetry={onRetryMock} />);
    const retryButton = getByText('Retry');
    fireEvent.press(retryButton);
    expect(onRetryMock).toHaveBeenCalled();
  });
});
