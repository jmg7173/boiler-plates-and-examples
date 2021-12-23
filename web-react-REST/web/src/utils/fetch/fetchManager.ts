export default class FetchManager {
  private static instance: FetchManager

  private protocol = `${ window.location.protocol }`.replace(':', '')

  private hostname = window.location.hostname

  private port = Number(window.location.port)

  private apiPrefix = process.env.REACT_APP_API_PREFIX

  private apiEndpoint = `${ this.protocol }://${ this.hostname }:${ this.port }/${ this.apiPrefix }`

  private endpoint = `${ this.protocol }://${ this.hostname }:${ this.port }/`

  public getEndpoint: () => string = () => {
    return this.endpoint
  }

  public getAccessToken: () => string | null = () => {
    return localStorage.getItem('accessToken')
  }

  public setAccessToken: (token: string) => void = (token: string) => {
    localStorage.setItem('accessToken', token)
  }

  public getRefreshToken: () => string | null = () => {
    return localStorage.getItem('refreshToken')
  }

  public setRefreshToken: (token: string) => void = (token: string) => {
    localStorage.setItem('refreshToken', token)
  }

  public resetToken: () => void = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }


  static getInstance(): FetchManager {
    if (!FetchManager.instance) {
      FetchManager.instance = new FetchManager()
    }
    return FetchManager.instance
  }

  public fetch(uri: string, request: RequestInit) {
    const accessToken = this.getAccessToken()
    // const refreshToken = this.getRefreshToken()
    const headers: HeadersInit = {
      Authorization: `Bearer ${ accessToken }`,
      ...request.headers,
    }
    const requestWithToken = {
      ...request,
      headers,
    }
    return fetch(this.apiEndpoint + uri, requestWithToken).then((response) => {
      if (!response.ok) return Promise.reject(response)
      return response.json().then((json) => {
        return json
      })
    })
  }

  public fetchStatic(uri: string, request: RequestInit) {
    return fetch(this.endpoint + uri, request).then((response) => {
      if (!response.ok) return Promise.reject(response)
      return response.blob().then((blob) => {
        return blob
      })
    })
  }
}
