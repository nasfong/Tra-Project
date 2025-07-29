import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type LoginMutation = {
  username: string;
  password: string;
};

type LoginResponse = {
  message: string;
  accessToken: string;
}

export const useMutationLogin = () => {
  return useMutation({
    mutationFn: (data: LoginMutation): Promise<LoginResponse> => {
      return axios.post("/login", data).then((resp) => resp.data);
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error Login: ${errorMessage}`);
    },
  });
};
