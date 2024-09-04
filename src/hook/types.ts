import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useQueryTypes = () => {
  return useQuery<Types[]>({
    queryKey: ["types"], // A unique key for the query
    queryFn: async () => {
      // The function to fetch data
      const response = await axios.get("/type");
      return response.data;
    },
  });
};

export const useSubmitType = (id?: string) => {
  return useMutation({
    mutationFn: (data: any) =>
      id ? axios.put(`/type/${id}`, data) : axios.post(`/type`, data),
    onSuccess: () => {
      toast.success(id ? "Type has been updated" : "Type has been created");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    },
  });
};
