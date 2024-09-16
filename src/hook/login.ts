import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type LoginMutation = {
  username: string;
  password: string;
};

export const useMutationLogin = () => {
  return useMutation({
    mutationFn: (data: LoginMutation): Promise<string> => {
      return axios.post("/login", data).then((resp) => resp.data.token);
    },
    onSuccess: () => {
      toast.success("Login Successfully!");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(`Error Login: ${errorMessage}`);
    },
  });
};
