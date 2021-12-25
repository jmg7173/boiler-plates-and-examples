import FetchManager from './fetchManager'
import { SetterOrUpdater } from 'recoil'
import { IUser } from '../../interfaces/User'

export const fetchAPI = async (uri: string, method: string, data?: Record<string, any>) => {
  const fetcher = FetchManager.getInstance()
  const requestOption: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const requestData: RequestInit = data
    ? {
      body: JSON.stringify(data),
    } : {}
  const request = {
    ...requestOption,
    ...requestData,
  }
  return fetcher.fetch(uri, request)
}

export const fetchImg = async (uri: string) => {
  const fetcher = FetchManager.getInstance()
  return fetcher.fetchStatic(uri, { method: 'get' })
}

export const login = async (data: Record<string, any>, setMe: SetterOrUpdater<IUser | null>) => {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    id: id,
    profile_img_path: profileImgPath,
  } = await fetchAPI('/auth/login', 'post', data)

  const fetcher = FetchManager.getInstance()
  fetcher.setAccessToken(accessToken)
  fetcher.setRefreshToken(refreshToken)
  setMe({
    id: id,
    username: data.username,
    profileImgPath,
  })
}

export const logout = async (setMe: SetterOrUpdater<IUser | null>) => {
  const fetcher = FetchManager.getInstance()
  await fetchAPI('/auth/logout', 'post')
  fetcher.resetToken()
  setMe(null)
}

export const getMe = async () => {
  try {
    return await fetchAPI('/auth/me', 'get')
  } catch {
    return null
  }
}

export const getEndpoint = () => {
  const fetcher = FetchManager.getInstance()
  return fetcher.getEndpoint()
}
