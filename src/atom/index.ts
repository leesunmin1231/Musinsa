import { atom } from 'recoil';

type PageInfo = {
  page: number;
  pageSize: number;
};

export const page = atom<PageInfo>({
  key: 'pageInfo',
  default: { page: 1, pageSize: 10 },
});
