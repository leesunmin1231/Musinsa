export interface AllFiltersType {
  isAlive: FilterType;
  female: FilterType;
  noTvSeries: FilterType;
}
export type FilterType = {
  key: string;
  buttonName: string;
  clicked: boolean;
  queryFiltering: boolean;
};
