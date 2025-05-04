import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/responses';
import { DrugImporterResponse } from '@/types/quotation';

export const getDrugImporterById = async (importerId: number) => {
  const response = await apiClient.get<ApiResponse<DrugImporterResponse>>(
    `/drug-importer/${importerId}`
  );
  return response.data;
};

export const getAllDrugImporters = async () => {
  const response =
    await apiClient.get<ApiResponse<DrugImporterResponse[]>>('/drug-importer');
  return response.data;
};

// Get all approved drug importers
export const getApprovedDrugImporters = async () => {
  const response = await apiClient.get<ApiResponse<DrugImporterResponse[]>>(
    '/drug-importer/approved'
  );
  return response.data;
};
