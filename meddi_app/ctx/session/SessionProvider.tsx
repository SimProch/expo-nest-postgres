import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";
import { Session } from "./auth.types";
import { useSignIn } from "@/hooks/access/useSignIn";
import { useSignUp } from "@/hooks/access/useSignUp";

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
              console.log(data);
            },
          });
        },
        signUp: async (params) => {
          signUp.mutate(params, {
            onSuccess: (data) => {
              console.log(data);
            },
          });
        },
        signOut: async () => {
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
