import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import { useStorageState } from "./useStorageState";
import { Session } from "./auth.types";
import { useSignIn } from "@/hooks/api/access/useSignIn";
import { useSignUp } from "@/hooks/api/access/useSignUp";
import { router } from "expo-router";
import { tokenProvider } from "@/services/token-provider";

const AuthContext = createContext<Session>({
  signIn: () => {
    throw "Not Implemented";
  },
  signUp: () => {
    throw "Not Implemented";
  },
  signOut: () => {
    throw "Not Implemented";
  },
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  useEffect(() => {
    tokenProvider.setToken(value.session ?? undefined);
  }, [value.session]);

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const signIn = useSignIn();
  const signUp = useSignUp();

  return (
    <AuthContext.Provider
      value={{
        signIn: async (params) => {
          signIn.mutate(params, {
            onSuccess: (data) => {
              setSession(data.access_token);
              router.replace("/(logged-in)/(tabs)/user-details");
            },
          });
        },
        signUp: async (params) => {
          signUp.mutate(params, {
            onSuccess: (data) => {
              setSession(data.access_token);
              router.replace("/(logged-in)/(tabs)/user-details");
            },
          });
        },
        signOut: async () => {
          router.replace("/");
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
