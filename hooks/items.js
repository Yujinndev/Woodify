import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchAllItems = async ({ search }) => {
  try {
    const response = await axios.get(`${API_URL}/allItems`);
    console.log(
      "🚀 ~ file: items.js:8 ~ fetchAllItems ~ response:",
      response.data
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`);
  }
};

export const fetchTrendingItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/trendingItems`);

    console.log(
      "🚀 ~ file: items.js:22 ~ fetchTrendingItems ~ response:",
      response.data
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`);
  }
};
