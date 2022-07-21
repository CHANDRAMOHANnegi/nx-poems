import { LoadingStatus } from '@poems-app/models';
import {
  mapPoemResponseToPoem,
  PoemResponse,
  poetryService,
} from '@poems-app/services';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const POEM_OF_THE_DAY_FEATURE_KEY = 'poemOfTheDay';

/*
 * Update these interfaces according to your requirements.
 */
export interface PoemOfTheDayEntity {
  id: number;
}

export interface PoemOfTheDayState extends EntityState<PoemOfTheDayEntity> {
  loadingStatus: LoadingStatus;
  poem: any;
  error: string;
}

export const poemOfTheDayAdapter = createEntityAdapter<PoemOfTheDayEntity>();

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
 *   dispatch(fetchPoemOfTheDay())
 * }, [dispatch]);
 * ```
 */
export const fetchPoemOfTheDay = createAsyncThunk(
  'poemOfTheDay/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const poemResponses: PoemResponse[] =
        await poetryService.getPoemOfTheDay();
        console.log('======>>>>>>>>>>',poemResponses);
        
      return mapPoemResponseToPoem(poemResponses[0]);
    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

export const initialPoemOfTheDayState: PoemOfTheDayState =
  poemOfTheDayAdapter.getInitialState({
    loadingStatus: 'not loaded',
    poem: null,
    error: '',
  });

export const poemOfTheDaySlice = createSlice({
  name: POEM_OF_THE_DAY_FEATURE_KEY,
  initialState: initialPoemOfTheDayState,
  reducers: {
    add: poemOfTheDayAdapter.addOne,
    remove: poemOfTheDayAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoemOfTheDay.pending, (state: PoemOfTheDayState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchPoemOfTheDay.fulfilled,
        (
          state: PoemOfTheDayState,
          action: PayloadAction<PoemOfTheDayEntity[]>
        ) => {
          poemOfTheDayAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(
        fetchPoemOfTheDay.rejected,
        (state: PoemOfTheDayState, action) => {
          state.loadingStatus = 'error';
          state.error = action.error.message || '';
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const poemOfTheDayReducer = poemOfTheDaySlice.reducer;

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
 *   dispatch(poemOfTheDayActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const poemOfTheDayActions = poemOfTheDaySlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllPoemOfTheDay);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = poemOfTheDayAdapter.getSelectors();

export const getPoemOfTheDayState = (rootState: unknown): PoemOfTheDayState =>
  rootState[POEM_OF_THE_DAY_FEATURE_KEY];

export const selectAllPoemOfTheDay = createSelector(
  getPoemOfTheDayState,
  selectAll
);

export const selectPoemOfTheDayEntities = createSelector(
  getPoemOfTheDayState,
  selectEntities
);
