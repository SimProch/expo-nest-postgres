import { SignInPayload } from "@/ctx/session/auth.types";
import { accessApiService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (params: SignInPayload) => {
      await accessApiService.signIn(params);
    },
  });
};
