import { userApiService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (params: any) => {
      return await userApiService.update(params);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
