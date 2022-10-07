export class UserEntity {
  id?: number;
  name: string;
  image?: string;
  password: string;
  email: string;
  role: string;
  recoverPasswordToken?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
