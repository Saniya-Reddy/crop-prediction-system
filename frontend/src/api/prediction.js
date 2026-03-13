import api from "./axios";   // axios instance with JWT


export const recommendCrop = async (data) => {
  const response = await api.post("recommend/", data);
  return response.data;
};


export const suggestBestCrop = async (data) => {
  const response = await api.post("suggest/", data);
  return response.data;
};