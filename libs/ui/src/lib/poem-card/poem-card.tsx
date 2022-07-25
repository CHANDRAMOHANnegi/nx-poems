import React from 'react';
import { Poem } from '@poems-app/models';

import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';

/* eslint-disable-next-line */
export interface PoemCardProps {
  poem: Poem;
}

export function PoemCard(props: PoemCardProps) {
  return (
    <ScrollView>
      <Text>{props.poem.author}</Text>
      <Text>{props.poem.title}</Text>
      <View>
        {props.poem.lines.map((line) => (
          <Text key={line}>{line}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

export default PoemCard;
