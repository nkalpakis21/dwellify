// types.ts
export type FormData = {
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

export type FormDataModel = FormData & { session_id: string };
