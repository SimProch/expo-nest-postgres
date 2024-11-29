import { UserFormData } from "@/components/ui/components/user/user-form/UserFormProvider.types";
import { userApiService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      params,
    }: {
      userId: string;
      params: Partial<UserFormData>;
    }) => {
      return await userApiService.update(userId, {
        city: params.city,
        phoneNumber: params.phoneNumber,
        postalCode: params.postalCode,
      });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
