import { combineReducers } from '@reduxjs/toolkit';
// import { connectRouter } from 'connected-react-router';

import { bookmarksReducer } from '../bookmarks/bookmarks.slice';
import { poemOfTheDayReducer } from '../poem/poem-of-the-day.slice';
// import { searchReducer } from '../search/search.slice';

import { RootState } from './root-state.interface';

export const createRootReducer = () =>
  combineReducers<RootState>({
    poemOfTheDay: poemOfTheDayReducer,
    bookmarks: bookmarksReducer,
    // search: searchReducer
  });
