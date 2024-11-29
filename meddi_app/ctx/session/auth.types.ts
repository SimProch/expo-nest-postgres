export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
};

export type Session = {
  signIn: (params: SignInParams) => Promise<void>;
  signUp: (params: SignUpParams) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
};
