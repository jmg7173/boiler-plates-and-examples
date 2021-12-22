import { atom } from 'recoil'
import { IUser } from '../interfaces/User'

export const meState = atom<IUser | null>({
  key: 'me',
  default: null,
})
