import React, { useEffect } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { PoemList as list, Poem } from '@poems-app/models';
import PoemCard from '../poem-card/poem-card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoemOfTheDay, poemOfTheDaySelelctors } from '@poems-app/store';
/* eslint-disable-next-line */
export interface PoemListProps {
  // poems: Poem;
}

export function PoemList(props: any) {
  const poem = useSelector(poemOfTheDaySelelctors.getPoemOfTheDay);
  console.log('-------------POEMS-----------', poem);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    dispatch(fetchPoemOfTheDay());
  }, []);

  const renderItem = ({ item }: { item: Poem }) => {
    return (
      <View>
        <PoemCard poem={item} />
      </View>
    );
  };

  return (
    <ScrollView>
      <Text style={{ textAlign: 'center' }}>Poem of the Day</Text>
      {poem && <PoemCard poem={poem} />}
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={({ title }) => title}
      />
    </ScrollView>
  );
}

export default PoemList;
