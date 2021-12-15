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

export const login = (data: Record<string, any>) => {
  return fetchAPI('/auth/login', 'post', data)
}

export const logout = () => {
  return fetchAPI('/auth/logout', 'post')
}
