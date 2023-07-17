export interface ClienteModelo {
  _id: any;
  email: string;
  name: string;
  lastName: string;
  password: string;
  isAdmin: boolean;
  profileUrl: string;
}

export interface DumpModel {
  _id: any;
  date: Date;
}
export interface RestoreModel {
  _id: any;
  date: Date;
}
