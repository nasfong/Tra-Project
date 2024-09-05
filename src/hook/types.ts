import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      id ? axios.put(`/type/${id}`, data) : axios.post(`/type`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['types'] })
      toast.success(id ? "Type has been updated" : "Type has been created");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    },
  });
};

export const useDeleteType = () => {
  const queryClient = useQueryClient();
  return useMutation<string, void, unknown>({
    mutationFn: (id) => {
      return axios.delete(`/type/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['types'] })
      toast.success("Type deleted successfully!")
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";

      if (status === 400) {
        toast.warning(errorMessage);
      } else if (status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(`Error deleting type: ${errorMessage}`);
      }
    },
  })
}
