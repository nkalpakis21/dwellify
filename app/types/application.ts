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


export interface IFeedbackForm {
  propertyImpression: 'yes' | 'maybe' | 'no';
  locationSatisfaction: boolean;
  criteriaMatch: boolean;
  additionalComments: string;
}
export interface IFeedback {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  refId: string;
  refType: 'PROPERTY' | 'USER'
  propertyImpression: 'yes' | 'maybe' | 'no';
  locationSatisfaction: boolean;
  criteriaMatch: boolean;
  additionalComments: string;
}
export type IFeedbackFormRequest = {
  refId: string;
  refType: 'PROPERTY' | 'USER'
  propertyImpression: 'yes' | 'maybe' | 'no';
  locationSatisfaction: boolean;
  criteriaMatch: boolean;
  additionalComments: string;
}
/**
 * Transforms an IApplication object into an IApplicationForm object.
 * @param application - The IApplication object.
 * @returns IApplicationForm - The transformed application form object.
 */
export const transformApplicationToForm = (application: IApplication): IApplicationForm => {
  return {
      full_name: application.full_name,
      email: application.email,
      phone_number: application.phone_number,
      employer_name: application.employer_name,
      current_rent: application.current_rent,
      reason_for_moving: application.reason_for_moving,
      monthly_income: application.monthly_income,
      current_address: application.current_address,
      credit_check_passed: application.credit_check_passed,
      evicted_status: application.evicted_status,
      criminal_record_status: application.criminal_record_status,
      move_in_date: application.move_in_date,
  };
};