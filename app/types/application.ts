import { Timestamp } from 'firebase/firestore';

export interface IApplication {
  id: string;
  createdAt: Timestamp;
  credit_check_passed: boolean;
  criminal_record_status: string;
  current_address: string;
  current_rent: number;
  email: string;
  employer_name: string;
  evicted_status: string;
  full_name: string;
  monthly_income: number;
  move_in_date: string;
  phone_number: string;
  reason_for_moving: string;
  session_id: string;
  updatedAt: Timestamp;
  refId: string;
  refType: 'PROPERTY' | 'USER'
}

export type IApplicationForm = {
    full_name: string;
    email: string;
    phone_number: string;
    employer_name: string;
    current_rent: number;
    reason_for_moving: string;
    monthly_income: number;
    current_address: string;
    credit_check_passed: boolean;
    evicted_status: string;
    criminal_record_status: string;
    move_in_date: string;
};

