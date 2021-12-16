import { atom } from 'recoil'

export const meState = atom({
  key: 'me',
  default: null,
})