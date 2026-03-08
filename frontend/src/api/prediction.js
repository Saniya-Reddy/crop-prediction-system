import api from "./axios";   // use your axios instance with JWT

export const submitSoilData = async (data) => {
  const response = await api.post("predict/", data); 
  return response.data; 
};

export const suggestBestCrop = async (data) => {
  const response = await api.post("suggest/", data);
  return response.data;
};
