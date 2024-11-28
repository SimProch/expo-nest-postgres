import { SignUpPayload } from "@/ctx/session/auth.types";
import { accessApiService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (params: SignUpPayload) => {
      await accessApiService.signUp(params);
    },
  });
};
