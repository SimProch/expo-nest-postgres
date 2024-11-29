import { useSession } from "@/ctx/session/SessionProvider";
import { jwtDecode } from "jwt-decode";

export const useUserId = () => {
  const { session } = useSession();
  if (!session) {
    return null;
  }
  const decoded = jwtDecode(session);
  return decoded.sub;
};
