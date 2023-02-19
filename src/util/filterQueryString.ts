import type { AllFiltersType } from '../types/FilterListType';

export const getFilterQueryString = (filterList: AllFiltersType) => {
  let query = '';
  if (filterList.isAlive.clicked) {
    query += `isAlive=true&`;
  }
  if (filterList.female.clicked) {
    query += `gender=Female&`;
  }
  return query;
};
