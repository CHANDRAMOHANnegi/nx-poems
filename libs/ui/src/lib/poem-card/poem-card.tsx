import { Poem } from '@poems-app/models';
import React from 'react';

import { View, Text } from 'react-native';

/* eslint-disable-next-line */
export interface PoemCardProps {
  poem: Poem;
}

export function PoemCard(props: PoemCardProps) {
  return (
    <View>
      <Text>{props.poem.author}</Text>
      <Text>{props.poem.title}</Text>
      <View>
        {props.poem.lines.map((line) => (
          <Text>{line}</Text>
        ))}
      </View>
    </View>
  );
}

export default PoemCard;
