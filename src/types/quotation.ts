export interface QuotationMedicinePrice {
  id: number;
  medicineId: number;
  price: number;
  medicineName?: string;
}

export interface QuotationDTO {
  id: number;
  drugImporterId: number;
  requestId: number;
  discount: number;
  createdDate: string;
  updatedDate: string;
  medicinePrices: QuotationMedicinePrice[];
  status: string;
}

export interface DrugImporterResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string;
  licenseNumber: string;
  nicotineProofFilePath: string;
  licenseProofFilePath: string;
}
