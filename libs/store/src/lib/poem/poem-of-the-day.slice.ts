import { LoadingStatus, Poem } from '@poems-app/models';
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
import { RootState } from '../root/root-state.interface';

export const POEM_OF_THE_DAY_FEATURE_KEY = 'poemOfTheDay';

export interface PoemOfTheDayEntity {
  title: string;
  author: string;
}

export interface PoemOfTheDayState extends EntityState<PoemOfTheDayEntity> {
  loadingStatus: LoadingStatus;
  poem: Poem | null;
  error: string;
}

export const poemOfTheDayAdapter = createEntityAdapter<PoemOfTheDayEntity>({
  selectId: (poem) => poem.title,
});

export const fetchPoemOfTheDay = createAsyncThunk(
  'poemOfTheDay/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const poemResponses: PoemResponse[] =
        await poetryService.getPoemOfTheDay();
      console.log('======>>>>>>>>>>', poemResponses);

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
    entities: [],
    ids: [],
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
        (state: PoemOfTheDayState, action:any) => {
          console.log(action);
          // poemOfTheDayAdapter.setAll(state, action.payload);
          state.poem = action.payload;
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

export const poemOfTheDayReducer = poemOfTheDaySlice.reducer;

export const poemOfTheDayActions = poemOfTheDaySlice.actions;

const { selectAll, selectEntities } = poemOfTheDayAdapter.getSelectors();

export const getPoemOfTheDayState = (rootState: RootState): PoemOfTheDayState =>
  rootState && rootState[POEM_OF_THE_DAY_FEATURE_KEY];

export const selectAllPoemOfTheDay = createSelector(
  getPoemOfTheDayState,
  selectAll
  // ,
  // (po) => {
  //   console.log('==-------------------===', po);
  //   return po;
  // }
);

export const selectPoemOfTheDayEntities = createSelector(
  getPoemOfTheDayState,
  selectEntities
);

const getPoemOfTheDay = createSelector(
  getPoemOfTheDayState,
  (state: PoemOfTheDayState) => state.poem
);

const getPoemOfTheDayLoadingStatus = createSelector(
  getPoemOfTheDayState,
  (state: PoemOfTheDayState): LoadingStatus => state.loadingStatus
);

export const poemOfTheDaySelelctors = {
  getPoemOfTheDayState,
  getPoemOfTheDay,
  getPoemOfTheDayLoadingStatus,
};
