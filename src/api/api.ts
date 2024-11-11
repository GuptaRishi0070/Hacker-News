// src/api.ts
import axios from 'axios';

const BASE_URL = 'http://hn.algolia.com/api/v1';

// Define types for response data
export interface Story {
  objectID: string;
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
  created_at: string;
}

export interface SearchResponse {
  hits: Story[];
  nbHits: number;
  nbPages: number;
  page: number;
}

// Function to fetch search results
export const searchStories = async (query: string, page: number = 0): Promise<SearchResponse> => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: {
      query,
      page,
      tags: 'story',
    },
  });
  return response.data;
};
