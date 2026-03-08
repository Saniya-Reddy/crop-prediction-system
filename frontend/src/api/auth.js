import api from "./axios";

export const loginUser = async (username, password) => {
  const response = await api.post("token/", {
    username,
    password,
  });

  // Store BOTH tokens
    localStorage.setItem("access", response.data.access);
    if (response.data.refresh) localStorage.setItem("refresh", response.data.refresh);

  return response.data;
};
