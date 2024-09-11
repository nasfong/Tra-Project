import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useQueryProducts = ({ fetch = true } = {}) => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/product");
      return response.data;
    },
    enabled: fetch,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<string, void, unknown>({
    mutationFn: (id) => {
      return axios.delete(`/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success("Product deleted successfully!")
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";

      if (status === 400) {
        toast.warning(errorMessage);
      } else if (status === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(`Error deleting product: ${errorMessage}`);
      }
    },
  })
}

export const useSubmitProduct = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any): Promise<any> => {
      if (id) {
        return axios
          .put(`/product/${id}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
      } else {
        return axios.post(`/product`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      if (id) toast.success("Product has been updated")
      else toast.success("Product has been created")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error product: ${errorMessage}`);
    },
  })
}