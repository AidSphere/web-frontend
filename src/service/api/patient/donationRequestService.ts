import apiClient from '@/lib/apiClient';

export interface DonationRequestFormData {
  title: string;
  description: string;
  expectedDate: string;
  prescribedMedicines: Array<{
    medicine: string;
    amount: string;
    unit: string;
  }>;
  images: string[];
  documents: string[];
  notes: string;
  patientId: string;
}

export const createDonationRequest = async (
  formData: DonationRequestFormData
) => {
  return await apiClient.post('/donation-requests/create', formData);
};
