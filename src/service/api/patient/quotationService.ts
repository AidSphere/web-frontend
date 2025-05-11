import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/responses';
import { QuotationDTO } from '@/types/quotation';

export const getQuotationById = async (id: number, drugImporterId: number) => {
  const response = await apiClient.get<QuotationDTO>(
    `/quotations/${id}?drugImporterId=${drugImporterId}`
  );
  return response.data;
};

export const getAllQuotationsByRequestId = async (requestId: number) => {
  const response = await apiClient.get<QuotationDTO[]>(
    `/quotations/request/${requestId}`
  );
  return response.data;
};

export const rejectPendingQuotations = async (requestId: number) => {
  const response = await apiClient.put(
    `/quotations/request/${requestId}/reject-pending`
  );
  return response.data;
};

export const updateQuotation = async (
  id: number,
  quotationDTO: QuotationDTO
) => {
  const response = await apiClient.put<QuotationDTO>(
    `/quotations/${id}`,
    quotationDTO
  );
  return response.data;
};
