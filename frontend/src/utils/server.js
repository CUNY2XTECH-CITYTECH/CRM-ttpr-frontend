export class HTTPClientError extends Error {
  constructor(message, status, statusText, detail) {
    super(message)
    this.message = message;
    this.status = status;
    this.statusText = statusText;
    this.detail = detail
    Object.setPrototypeOf(this, HTTPClientError.prototype)
  }
}
/**
 * class for handling http requests
 */
export class BaseClient {
  constructor(defaultHeaders = { "Content-Type": "application/json" }) {
    const baseURL = import.meta.env.VITE_API_URI;
    if (!baseURL) {
      throw new Error("BaseURL is required for BaseClient.");
    }
    this.baseURL = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
    this.defaultHeaders = defaultHeaders;
  }
  // for making request
  async request(endpoint, method, body, options) {
    const urlObj = new URL(`${this.baseURL}api/${endpoint}`)
    const url = urlObj.toString()
    const headers = { ...this.defaultHeaders, ...options?.headers };
    // generic fetch method
    const config = {
      method,
      headers,
      body: JSON.stringify(body),
      ...options
    }
    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        console.log(response, 'ressss')
        let errorData = null;
        errorData = await response.json()
        let errorMessage = errorData?.message || response.statusText || `Request failed with ${response.status}`
        // return new HTTPClientError(
        //   errorMessage, response.status, response.statusText, errorData?.toString()
        // )
        return { error: errorMessage, status: response.status }
      }
      const contentType = response.headers.get("content-type")
      if (contentType?.includes('application/json')) {
        const data = await response.json()
        return {
          data,
          status: response.status,
          statusText: response.statusText
        }
      }
      return {
        data: {},
        status: response.status,
        statusText: response.statusText,
      };
    }
    catch (error) {
      if (error instanceof HTTPClientError) {
        return error
      }
      if (
        error instanceof TypeError &&
        error.message === "Failed to fetch"
      ) {
        // This typically indicates a network error (e.g., CORS, no internet)
        return new HTTPClientError(
          "Network error or CORS issue. Please check your connection or server configuration.",
          0, // Use 0 for network errors as there's no HTTP status
          "Network Error",
          error?.toString(),
        );
      }
      // Catch any other unexpected errors
      return new HTTPClientError(
        "An unexpected error occurred during the request.",
        -1, // Use -1 for unknown errors
        "Unknown Error",
        error?.toString(),
      );
    }
  }

  /**
   * @param {1} api-endpoint (example: user/)
   * @param {2} options like authorization 
   */
  get(endpoint, options) {
    return this.request(endpoint, "GET", undefined, options)
  }
  /**
   * @param {1} api-endpoint (example: user/)
   * @param {2} body - data
   * @param {3} options like authorization 
   */
  post(endpoint, body, options) {
    return this.request(endpoint, "POST", body, options)
  }
  /**
   * @param {1} api-endpoint (example: user/)
   * @param {2} body - data
   * @param {3} options like authorization 
   */
  put(endpoint, body, options) {
    return this.request(endpoint, "PUT", body, options)
  }
  /**
   * @param {1} api-endpoint (example: user/)
   * @param {2} body - data
   * @param {3} options like authorization 
   */
  delete(endpoint, body, options) {
    return this.request(endpoint, "DELETE", body, options)
  }


}
