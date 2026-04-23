const getFallbackApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return "http://localhost:5000";
  }

  const protocol = window.location.protocol === "https:" ? "https:" : "http:";
  const hostname = window.location.hostname || "localhost";

  return `${protocol}//${hostname}:5000`;
};

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || getFallbackApiBaseUrl();

const request = async (path, payload) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || "Request failed.");
  }

  return body;
};

export const registerUser = async ({
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword
}) => {
  const result = await request("/api/auth/register", {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword
  });

  return result.user;
};

export const loginUser = async (email, password) => {
  const result = await request("/api/auth/login", { email, password });
  return result.user;
};
