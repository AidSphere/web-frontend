export enum MedicalDocumentType {
  PRESCRIPTION = 'PRESCRIPTION',
  DIAGNOSIS_REPORT = 'DIAGNOSIS_REPORT',
  BIOPSY_REPORT = 'BIOPSY_REPORT',
  SCAN_REPORT = 'SCAN_REPORT',
  BLOOD_TEST_REPORT = 'BLOOD_TEST_REPORT',
  TREATMENT_PLAN = 'TREATMENT_PLAN',
  CHEMOTHERAPY_REPORT = 'CHEMOTHERAPY_REPORT',
  RADIOTHERAPY_REPORT = 'RADIOTHERAPY_REPORT',
  SURGERY_REPORT = 'SURGERY_REPORT',
  IMMUNOTHERAPY_REPORT = 'IMMUNOTHERAPY_REPORT',
  INSURANCE_DOCUMENT = 'INSURANCE_DOCUMENT',
  ID_PROOF = 'ID_PROOF',
  BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE',
  OTHER = 'OTHER',
}

export enum RecordVisibility {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  REGISTERED_ONLY = 'REGISTERED_ONLY',
}

export interface MedicalDocument {
  documentName: string;
  documentType: MedicalDocumentType;
  documentUrl: string;
  visibility?: RecordVisibility;
}

export interface MedicalRecordDto {
  recordId?: number;
  cancerType: string;
  cancerStage: string;
  hospitalName: string;
  hospitalAddress: string;
  doctorName: string;
  doctorContact: string;
  medicalDocuments: MedicalDocument[];
}

export interface VerificationResponseDto {
  verificationId: number;
  verified: boolean;
  verificationDate?: string;
  verifiedBy?: string;
}

export interface PatientProfileDto {
  patientId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  permanentAddress: string;
  currentAddress: string;
  profileImageUrl: string;
  verification?: VerificationResponseDto;
  medicalRecord?: MedicalRecordDto;
}
