export type TLogin = {
  email: string;
  password: string;
};

export type tokenPayload = {
  email: string;
  role: string;
  phone?: string;
  name?: string;
  profileImage?: string;
  address?: string;
};
