import { weatherApiService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetUserWeather = (userId: string | undefined | null) => {
  return useQuery({
    queryKey: ["weather", userId],
    queryFn: () => {
      return weatherApiService.getUserWeather(userId!);
    },
    enabled: !!userId,
  });
};
