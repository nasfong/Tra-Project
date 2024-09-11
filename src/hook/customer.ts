import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useQueryCustomers = () => {
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get("/customer");
      return response.data;
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<string, void, unknown>({
    mutationFn: (id) => {
      return axios.delete(`/customer/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast.success("Customer deleted successfully!")
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";

      if (status === 400) {
        toast.warning(errorMessage);
      } else if (status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(`Error deleting customer: ${errorMessage}`);
      }
    },
  })
}

export const useSubmitCustomer = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any): Promise<any> => {
      if (id) {
        return axios
          .put(`/customer/${id}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
      } else {
        return axios.post(`/customer`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      if (id) toast.success("Customer has been updated")
      else toast.success("Customer has been created")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error customer: ${errorMessage}`);
    },
  })
}

export const useUpdateStatusCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CustomerStatusForm) => axios.put(`/customer/${data.id}/status`, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(res.data.message);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    },
  });
};