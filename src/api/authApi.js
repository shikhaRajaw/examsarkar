import { buildApiUrl } from "../utils/apiBaseUrl";

const request = async (path, payload) => {
  const response = await fetch(buildApiUrl(path), {
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

  // return both user and token so callers can persist auth token
  return { user: result.user, token: result.token };
};

export const loginUser = async (email, password) => {
  const result = await request("/api/auth/login", { email, password });
  // return both user and token so callers can persist auth token
  return { user: result.user, token: result.token };
};
