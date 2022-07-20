/* eslint-disable jsx-a11y/accessible-emoji */
import { Loading } from '@poems-app/shared/ui';
import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello</Text>
        <Loading />
      </SafeAreaView>
    </>
  );
};

export default App;
