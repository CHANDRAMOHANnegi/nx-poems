import { initialBookmarksState } from '../bookmarks/bookmarks.slice';
import { initialPoemOfTheDayState } from '../poem/poem-of-the-day.slice';
// import { initialSearchState } from '../search/search.slice';

import { RootState } from './root-state.interface';

export const initialRootState: RootState = {
  poemOfTheDay: initialPoemOfTheDayState,
  bookmarks: initialBookmarksState,
  // search: initialSearchState
};