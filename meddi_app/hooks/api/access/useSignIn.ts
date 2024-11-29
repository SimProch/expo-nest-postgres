import { SignInParams } from "@/ctx/session/auth.types";
import { accessApiService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (params: SignInParams) => {
      return await accessApiService.signIn(params);
    },
  });
};
