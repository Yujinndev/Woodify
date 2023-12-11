import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`);
  }
};

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

export default useCategories;
