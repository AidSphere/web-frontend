import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/responses';

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

export interface DonationRequest {
  requestId: number;
  patientId: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  expectedDate: string;
  images: string[];
  documents: string[];
  prescribedMedicines: Array<{
    medicine: string;
    amount: number;
    unit: string;
  }>;
}

export const createDonationRequest = async (
  formData: DonationRequestFormData
) => {
  return await apiClient.post('/donation-requests/create', formData);
};

export const fetchDonationRequestsByPatient = async (patientId: number) => {
  const response = await apiClient.get<ApiResponse<DonationRequest[]>>(
    `/donation-requests/patient/${patientId}`
  );
  return response.data;
};

// Add this new function to handle deletion
export const deleteDonationRequest = async (requestId: number) => {
  const response = await apiClient.delete(`/donation-requests/${requestId}`);
  return response.data;
};
