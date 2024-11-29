import { SignUpParams } from "@/ctx/session/auth.types";
import { accessApiService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (params: SignUpParams) => {
      return await accessApiService.signUp(params);
    },
  });
};
