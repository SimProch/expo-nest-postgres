import { UseQueryResult } from "@tanstack/react-query";

export type RenderUnsettledUIProps<T> = {
  data: Pick<UseQueryResult<T>, "status" | "error" | "refetch">;
};
