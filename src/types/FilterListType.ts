export interface AllFiltersType {
  noName: FilterType;
  isAlive: FilterType;
  female: FilterType;
  noTvSeries: FilterType;
  init: FilterType;
}
export type FilterType = {
  key: string;
  buttonName: string;
  clicked: boolean;
  queryFiltering: boolean;
};
