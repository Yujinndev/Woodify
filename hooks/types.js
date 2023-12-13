import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/types`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`);
  }
};

const useTypes = () =>
  useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
  });

export default useTypes;
