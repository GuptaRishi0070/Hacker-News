import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface Story {
  objectID: string;
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
}

interface FetchStoriesResponse {
  hits: Story[];
  nbHits: number;
  page: number;
}

interface SearchState {
  query: string;
  tags: string;
  sortBy: string;
  page: number;
  stories: Story[];
  searchHistory: string[];
  totalResults: number;
}


const initialState: SearchState = {
  query: '',
  tags: 'story',
  sortBy: 'search',
  page: 0,
  stories: [],
  searchHistory: [],
  totalResults: 0,
};


export const fetchStories = createAsyncThunk<FetchStoriesResponse, { query: string; tags: string; page: number; sortBy: string }>(
  'search/fetchStories',
  async ({ query, tags, page, sortBy }) => {
    const response = await axios.get<FetchStoriesResponse>(`https://hn.algolia.com/api/v1/${sortBy}`, {
      params: { query, tags, page },
    });
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state: SearchState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setTags: (state: SearchState, action: PayloadAction<string>) => {
      state.tags = action.payload;
    },
    setSortBy: (state: SearchState, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setPage: (state: SearchState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    addToSearchHistory: (state: SearchState, action: PayloadAction<string>) => {
      state.searchHistory.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStories.fulfilled, (state, action: PayloadAction<FetchStoriesResponse>) => {
      state.stories = action.payload.hits;
      state.totalResults = action.payload.nbHits;
      state.page = action.payload.page;
    });
  },
});

export const { setQuery, setTags, setSortBy, setPage, addToSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;
