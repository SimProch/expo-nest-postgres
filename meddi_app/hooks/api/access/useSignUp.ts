import { SignUpParams } from "@/ctx/session/auth.types";
import { accessApiService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (params: SignUpParams) => {
      return await accessApiService.signUp({
        email: params.email,
        password: params.password,
        phoneNumber: params.phoneNumber,
        cities: [{ city: params.city, postalCode: params.postalCode }],
      });
    },
  });
};
