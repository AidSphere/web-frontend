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
  prescriptionUrl: string;
  images: string[];
  documents: string[];
  prescribedMedicines: Array<{
    medicine: string;
    amount: number;
    unit: string;
  }>;
  hospitalName?: string;
  messageToPatient?: string;
  adminId?: number;
  adminApprovedAt?: string;
  defaultPrice?: number;
  remainingPrice?: number;
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

export const fetchDonationRequestById = async (requestId: number) => {
  const response = await apiClient.get<ApiResponse<DonationRequest>>(
    `/donation-requests/${requestId}`
  );
  return response.data;
};

// Add this new function to handle deletion
export const deleteDonationRequest = async (requestId: number) => {
  const response = await apiClient.delete(`/donation-requests/${requestId}`);
  return response.data;
};

// Add update function for donation requests
export const updateDonationRequest = async (
  requestId: number,
  formData: DonationRequestFormData
) => {
  const response = await apiClient.put(
    `/donation-requests/${requestId}`,
    formData
  );
  return response.data;
};

// Add this new function to fetch donation requests with QUOTATION_ISSUED status
export const fetchQuotationIssuedRequests = async () => {
  const response = await apiClient.get<ApiResponse<DonationRequest[]>>(
    '/donation-requests/quotation-issued'
  );
  return response.data;
};

// Add the updateDonationRequestDefaultPrice function to the existing file

export const updateDonationRequestDefaultPrice = async (
  requestId: number,
  defaultPrice: number
) => {
  const response = await apiClient.put<ApiResponse<DonationRequest>>(
    `/donation-requests/${requestId}/default-price`,
    defaultPrice
  );
  return response.data;
};
