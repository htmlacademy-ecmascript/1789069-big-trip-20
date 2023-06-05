/**
 * @abstract
 */
class Service {
  /**
   * @param {ServiceOptions} options
   */
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.minResponseTime = options.minResponseTime;
    this.authorization = options.authorization;
  }

  /**
   * @param {string} path
   * @param {RequestInit} [init]
   * @return {Promise<Response>}
   */
  request(path, init = {}) {
    const url = new URL(path, this.baseUrl);
    const responsePromise = fetch(url, this.extendRequestInit(init));

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await responsePromise;

          if (!response.ok) {
            throw new Error(String(response.status));
          }
          resolve(response);

        } catch (error) {
          reject(error);
        }
      }, this.minResponseTime);
    });
  }

  /**
   * @param {RequestInit} init
   * @return {RequestInit}
   */
  extendRequestInit(init) {
    const headers = new Headers(init.headers);

    headers.set('authorization', this.authorization);

    return {...init, headers};
  }
}

export default Service;
