/* eslint-disable jsx-a11y/accessible-emoji */
import { Loading } from '@poems-app/shared/ui';
import { PoemList } from '@poems-app/ui';
import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createRootStore } from '@poems-app/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const { store, persistor } = createRootStore(persistConfig);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello</Text>
        <Loading />
        <PoemList />
      </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
