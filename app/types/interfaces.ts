import { LoginOptions } from "./enums";

export interface SignUpFormData {
  email?: string;
  password?: string;
  _action?: LoginOptions;
}
