import { weatherApiService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetCityWeather = (cityId: string | undefined | null) => {
  return useQuery({
    queryKey: ["weather", cityId],
    queryFn: () => {
      return weatherApiService.getCityWeather(cityId!);
    },
    enabled: !!cityId,
  });
};
