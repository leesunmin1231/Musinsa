import { atom } from 'recoil';
import { FilterListType } from '../types/FilterListType';

export const filters = atom<FilterListType[]>({
  key: 'filterList',
  default: [
    { key: 1, buttonName: '무명 인물 제외', clicked: true },
    { key: 2, buttonName: '생존 인물만', clicked: false },
    { key: 3, buttonName: '여자', clicked: false },
    { key: 4, buttonName: 'tvSeries 없음', clicked: false },
    { key: 5, buttonName: '초기화', clicked: false },
  ],
});
