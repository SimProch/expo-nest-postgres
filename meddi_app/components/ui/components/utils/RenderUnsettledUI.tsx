import { ThemedText } from "@/components/ThemedText";
import { RenderUnsettledUIProps } from "./RenderUnsettledUI.types";

const RenderUnsettledUI = <T,>({
  data: { status, error, refetch },
}: RenderUnsettledUIProps<T>) => {
  if (status === "pending") {
    return <ThemedText>"Loading..."</ThemedText>;
  }

  if (status === "error") {
    console.error(error);
    return <ThemedText>"Error!"</ThemedText>;
  }

  return null;
};

export { RenderUnsettledUI };
