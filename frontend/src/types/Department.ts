export interface Department {
  _id: string;
  name: string;
  description: string;
  createdBy: {
    name: string;
    email: string;
  };
  createdAt: string;
}