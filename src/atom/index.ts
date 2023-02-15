import { atom } from 'recoil';

export const modalContent = atom({
  key: 'modal',
  default: { display: false, message: '', buttons: [] },
});
