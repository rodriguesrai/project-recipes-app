import { mockData, mockDataOne } from './mockData';

export const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(mockData),
});

export const mockFetchOne = () => Promise.resolve({
  json: () => Promise.resolve(mockDataOne),
});
