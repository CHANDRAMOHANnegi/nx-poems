import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface LoadingProps {}

export function Loading(props: LoadingProps) {
  return (
    <View>
      <Text>Welcome to loading!</Text>
    </View>
  );
}

export default Loading;
