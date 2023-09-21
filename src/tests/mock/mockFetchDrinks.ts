import { mockDataDrinks, mockDataDrinksOne } from './mockData';

export const mockFetchDrinks = () => Promise.resolve({
  json: () => Promise.resolve(mockDataDrinks),
});
export const mockFetchDrinksOne = () => Promise.resolve({
  json: () => Promise.resolve(mockDataDrinksOne),
});
