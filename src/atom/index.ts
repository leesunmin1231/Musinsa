import { atom } from 'recoil';
import { AllFiltersType } from '../types/FilterListType';
import modalType from '../types/Modal';

export const filters = atom<AllFiltersType>({
  key: 'filterList',
  default: {
    isAlive: { key: 'isAlive', buttonName: '생존 인물만', clicked: false, queryFiltering: true },
    female: { key: 'female', buttonName: '여자', clicked: false, queryFiltering: true },
    noTvSeries: { key: 'noTvSeries', buttonName: 'tvSeries 없음', clicked: false, queryFiltering: false },
  },
});

export const modalContent = atom<modalType>({
  key: 'modal',
  default: { display: false, message: '', buttons: [] },
});
