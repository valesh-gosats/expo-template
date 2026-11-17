export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
