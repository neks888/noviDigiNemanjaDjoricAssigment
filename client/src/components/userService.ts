import axios from "axios";

const API_URL = "/api/users";

export const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const getUser = async (token: string) => {
  const response = await axios.get(API_URL, {
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};
