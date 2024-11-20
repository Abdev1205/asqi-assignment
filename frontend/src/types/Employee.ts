import type { Department } from "./Department";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  departments: Department[];
  role: string;
  createdAt: string;
}