import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { PoemList as list, Poem } from '@poems-app/models';
import PoemCard from '../poem-card/poem-card';
/* eslint-disable-next-line */
export interface PoemListProps {
  // poems: Poem;
}

export function PoemList(props: PoemListProps) {
  const renderItem = ({ item }: { item: Poem }) => {
    return (
      <View>
        <PoemCard poem={item} />
      </View>
    );
  };

  return (
    <View>
      <FlatList data={list} renderItem={renderItem} />
    </View>
  );
}

export default PoemList;
