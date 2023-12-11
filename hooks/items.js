import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`);
  }
};

const useItems = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

export default useItems;
