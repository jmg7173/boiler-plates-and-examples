import FetchManager from './fetchManager'

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

export const login = async (data: Record<string, any>, setMe: any) => {
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
  } = await fetchAPI('/auth/login', 'post', data)

  const fetcher = FetchManager.getInstance()
  fetcher.setAccessToken(accessToken)
  fetcher.setRefreshToken(refreshToken)
  setMe(data.username)
}

export const logout = async (setMe: any) => {
  const fetcher = FetchManager.getInstance()
  fetcher.resetToken()
  await fetchAPI('/auth/logout', 'post')
  setMe(null)
}
