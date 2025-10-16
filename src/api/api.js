/**
 * Modular HTTP Client API
 * A flexible, lightweight HTTP client for making API calls
 */

class HttpClient {
  constructor(baseConfig = {}) {
    this.baseURL = baseConfig.baseURL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...baseConfig.headers
    };
    this.timeout = baseConfig.timeout || 10000;
    this.interceptors = {
      request: [],
      response: []
    };
  }

  // Add request interceptor
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  // Add response interceptor
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  // Apply request interceptors
  async applyRequestInterceptors(config) {
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config);
    }
    return config;
  }

  // Apply response interceptors
  async applyResponseInterceptors(response) {
    for (const interceptor of this.interceptors.response) {
      response = await interceptor(response);
    }
    return response;
  }

  // Core HTTP request method
  async request(config) {
    try {
      // Apply request interceptors
      config = await this.applyRequestInterceptors(config);

      // Build URL
      const url = config.url.startsWith('http') 
        ? config.url 
        : `${this.baseURL}${config.url}`;

      // Prepare headers
      const headers = {
        ...this.defaultHeaders,
        ...config.headers
      };

      // Prepare request options
      const requestOptions = {
        method: config.method || 'GET',
        headers,
        signal: AbortSignal.timeout(this.timeout)
      };

      // Add body for POST/PUT/PATCH requests
      if (['POST', 'PUT', 'PATCH'].includes(requestOptions.method.toUpperCase())) {
        if (config.data) {
          if (headers['Content-Type'] === 'application/json') {
            requestOptions.body = JSON.stringify(config.data);
          } else {
            requestOptions.body = config.data;
          }
        }
      }

      // Make the request
      const response = await fetch(url, requestOptions);
      
      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse response
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      const result = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      };

      // Apply response interceptors
      return await this.applyResponseInterceptors(result);

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Convenience methods
  async get(url, config = {}) {
    return this.request({ ...config, method: 'GET', url });
  }

  async post(url, data, config = {}) {
    return this.request({ ...config, method: 'POST', url, data });
  }

  async put(url, data, config = {}) {
    return this.request({ ...config, method: 'PUT', url, data });
  }

  async patch(url, data, config = {}) {
    return this.request({ ...config, method: 'PATCH', url, data });
  }

  async delete(url, config = {}) {
    return this.request({ ...config, method: 'DELETE', url });
  }
}

/**
 * Chat API Service
 * Specific API methods for chatbot functionality
 */
class ChatAPI {
  constructor(baseConfig = {}) {
    this.client = new HttpClient(baseConfig);
    this.sessionID = baseConfig.sessionID 
    this.teamName=baseConfig.teamName,
    this.version=baseConfig.version
  }


  // Send message to chat endpoint
  async sendMessage(
    message,
    config = {}
  ) {
    const response=await this.client.post(`/chat/query?team_name=${this.teamName}&version=${this.version}`, {
      session_id:this.sessionID,
      team_name:"OA-TEST",
      version:"1.0.0",
      query:message,
      ...config.data
    }, {
      headers: {
        ...config.headers
      }
    });

    return response.data
  }

  // Get chat history
  async getChatHistory( config = {}) {
    const response=await this.client.get(`/chat/history?session_id=${this.sessionID}`, {
      headers: {
        ...config.headers
      }
    });
    return response.data.reverse()
  }

  static init(config){
    const api=new ChatAPI(config)
    return api
  }
 

}






export {
  ChatAPI
};

// Also make available globally for non-module usage
if (typeof window !== 'undefined') {
  window.ChatAPI = ChatAPI
}
