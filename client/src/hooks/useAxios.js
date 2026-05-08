import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

async function sendRequest(method, data, url) {
  try {
    const response = await axiosInstance({
      url: url,
      method: method,
      data: data,
    });

    return { data: response.data, error: null };
  } catch (error) {
    console.log(
      `sendRequest failed. Error: ${error instanceof Error ? error?.message : ""}`,
    );
    return { data: null, error };
  }
}

export function useAxios() {
  return { sendRequest };
}
