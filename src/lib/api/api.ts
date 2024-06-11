export default class API {
  static token = process.env.API_TOKEN;

  static async GET(resourceUrl: string | URL | Request, options?: RequestInit) {
    const init = Object.assign(
      { method: 'GET', headers: { Authorization: API.token } },
      options,
    );

    return fetch(resourceUrl, init);
  }

  static async POST(
    resourceUrl: string | URL | Request,
    options?: RequestInit,
  ) {
    const init = Object.assign(
      { method: 'POST', headers: { Authorization: API.token } },
      options,
    );

    return fetch(resourceUrl, init);
  }
}
