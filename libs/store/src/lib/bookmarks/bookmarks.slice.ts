import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const BOOKMARKS_FEATURE_KEY = 'bookmarks';

/*
 * Update these interfaces according to your requirements.
 */
export interface BookmarksEntity {
  id: number;
}

export interface BookmarksState extends EntityState<BookmarksEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const bookmarksAdapter = createEntityAdapter<BookmarksEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchBookmarks())
 * }, [dispatch]);
 * ```
 */
export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getBookmarkss()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialBookmarksState: BookmarksState =
  bookmarksAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const bookmarksSlice = createSlice({
  name: BOOKMARKS_FEATURE_KEY,
  initialState: initialBookmarksState,
  reducers: {
    add: bookmarksAdapter.addOne,
    remove: bookmarksAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state: BookmarksState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchBookmarks.fulfilled,
        (state: BookmarksState, action: PayloadAction<BookmarksEntity[]>) => {
          bookmarksAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchBookmarks.rejected, (state: BookmarksState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const bookmarksReducer = bookmarksSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(bookmarksActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const bookmarksActions = bookmarksSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllBookmarks);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = bookmarksAdapter.getSelectors();

export const getBookmarksState = (rootState: unknown): BookmarksState =>
  rootState[BOOKMARKS_FEATURE_KEY];

export const selectAllBookmarks = createSelector(getBookmarksState, selectAll);

export const selectBookmarksEntities = createSelector(
  getBookmarksState,
  selectEntities
);
