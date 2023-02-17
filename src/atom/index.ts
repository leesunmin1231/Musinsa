import { atom } from 'recoil';
import { AllFiltersType } from '../types/FilterListType';

export const filters = atom<AllFiltersType>({
  key: 'filterList',
  default: {
    noName: { key: 'noName', buttonName: '무명 인물 제외', clicked: true, queryFiltering: false },
    isAlive: { key: 'isAlive', buttonName: '생존 인물만', clicked: false, queryFiltering: true },
    female: { key: 'female', buttonName: '여자', clicked: false, queryFiltering: true },
    noTvSeries: { key: 'noTvSeries', buttonName: 'tvSeries 없음', clicked: false, queryFiltering: false },
    init: { key: 'init', buttonName: '초기화', clicked: false, queryFiltering: false },
  },
});
