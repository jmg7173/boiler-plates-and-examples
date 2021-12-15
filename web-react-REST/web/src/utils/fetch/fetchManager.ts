export default class FetchManager {
  private static instance: FetchManager

  private protocol = `${ window.location.protocol }`.replace(':', '')

  private hostname = window.location.hostname

  private port = Number(window.location.port)

  private apiPrefix = process.env.REACT_APP_API_PREFIX

  private endpoint = `${ this.protocol }://${ this.hostname }:${ this.port }/${ this.apiPrefix }`

  static getInstance(): FetchManager {
    if (!FetchManager.instance) {
      FetchManager.instance = new FetchManager()
    }
    return FetchManager.instance
  }

  public fetch(uri: string, request: RequestInit) {
    return fetch(this.endpoint + uri, request).then((response) => {
      if (!response.ok) return Promise.reject(response)
      return response.json().then((json: any) => {
        return json
      })
    })
  }
}
