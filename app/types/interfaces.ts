import { LoginOptions } from "./enums";

export interface SignUpFormData {
  email?: string;
  password?: string;
  _action?: LoginOptions;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ResponseError extends Error {
  status?: number;
  statusText?: string;
  data?: string;
  error?: Error;
}
