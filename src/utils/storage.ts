interface UserData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  companyName: string;
  isAgency: boolean;
  profilePicture?: string;
}

export const saveUser = (userData: UserData): void => {
  localStorage.setItem('popx_user', JSON.stringify(userData));
};

export const getUser = (): UserData | null => {
  const data = localStorage.getItem('popx_user');
  return data ? JSON.parse(data) : null;
};

export const checkCredentials = (email: string, password: string): boolean => {
  const user = getUser();
  return user?.email === email && user?.password === password;
};