export class API {
  static token = process.env.API_TOKEN;

  static async GET(resourceUrl: string | URL | Request, options?: RequestInit) {
    const init = Object.assign(
      { method: 'GET', headers: { Authorization: API.token } },
      options,
    );

    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${resourceUrl}`,
      init,
    );
  }

  static async POST(
    resourceUrl: string | URL | Request,
    options?: RequestInit,
  ) {
    const init = Object.assign(
      { method: 'POST', headers: { Authorization: API.token } },
      options,
    );

    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${resourceUrl}`,
      init,
    );
  }
}
