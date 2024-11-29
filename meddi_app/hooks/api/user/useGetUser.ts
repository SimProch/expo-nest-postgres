import { userApiService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => {
      return userApiService.getUserData(userId);
    },
  });
};
