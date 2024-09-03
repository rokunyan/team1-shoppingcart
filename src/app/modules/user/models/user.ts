export interface User {
  id?: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  birthDate: string | null;
  mobileNumber: string;
  interests: string[] | [];
  isActive: boolean;
  isAdmin: boolean;
}
