export default class API {
  static token = process.env.API_TOKEN;

  static async GET(url: string | URL | Request, options?: RequestInit) {
    const init = Object.assign(
      { method: 'GET', headers: { Authorization: API.token } },
      options,
    );

    return await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${url}`,
      init,
    );
  }

  static async POST(url: string | URL | Request, options?: RequestInit) {
    const init = Object.assign(
      { method: 'POST', headers: { Authorization: `Bearer ${API.token}` } },
      options,
    );

    return await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
      init,
    );
  }
}
