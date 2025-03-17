import { addressOutput } from "./address_output";

export interface clientOutput {
  created_at: string;
  date_of_birth: string;
  document: string;
  general_registration: string;
  id: number;
  name: string;
  phone_number: string;
  updated_at: string;
  addresses: addressOutput[];
}
