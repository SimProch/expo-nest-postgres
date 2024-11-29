export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
};

export type Session = {
  signIn: (params: SignInPayload) => Promise<void>;
  signUp: (params: SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
};
