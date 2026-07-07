import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ApiClient {
  constructor() {
    this.baseURL = API_URL;
  }

  async getToken() {
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
      throw new Error("Could not get auth token — please log in again");
    }
    return data.token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = await this.getToken();

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const err = new Error(error.message || "Something went wrong");
      err.status = response.status;
      err.code = error.code;
      throw err;
    }

    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // NEW: partial update — replaces the old put()
  patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiClient();

export const taskApi = {
  getAll: () => api.get("/tasks"),
  create: (data) => api.post("/tasks", data),
  update: (id, data) => api.patch(`/tasks/${id}`, data), // <-- PATCH now
  delete: (id) => api.delete(`/tasks/${id}`),
};

export const paymentApi = {
  createCheckoutSession: () => api.post("/create-checkout-session"),
};