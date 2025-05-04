import apiClient, { apiService } from '@/lib/apiClient';
import { ApiResponse } from '@/types/responses';
import { MedicalRecordDto, PatientProfileDto } from '@/types/patient';

/**
 * Service to handle patient profile related API calls
 */
const patientProfileService = {
  /**
   * Get patient profile by ID
   */
  getPatientProfile: async (
    patientId: string | number
  ): Promise<PatientProfileDto> => {
    const response = await apiService.get<PatientProfileDto>(
      `/patients/${patientId}/profile`
    );
    return response.data as PatientProfileDto;
  },

  /**
   * Update patient profile
   */
  updatePatientProfile: async (
    patientId: string | number,
    profileData: Partial<PatientProfileDto>
  ): Promise<PatientProfileDto> => {
    const response = await apiService.put<PatientProfileDto>(
      `/patients/${patientId}`,
      profileData
    );
    return response.data as PatientProfileDto;
  },

  /**
   * Get medical records for a patient
   */
  getMedicalRecords: async (
    patientId: string | number
  ): Promise<MedicalRecordDto> => {
    const response = await apiService.get<MedicalRecordDto>(
      `/medical-records/patients/${patientId}`
    );
    return response.data as MedicalRecordDto;
  },

  /**
   * Create medical record for a patient
   */
  createMedicalRecord: async (
    patientId: string | number,
    medicalRecordData: MedicalRecordDto
  ): Promise<MedicalRecordDto> => {
    const response = await apiService.post<MedicalRecordDto>(
      `/medical-records/patients/${patientId}`,
      medicalRecordData
    );
    return response.data as MedicalRecordDto;
  },

  /**
   * Update medical record
   */
  updateMedicalRecord: async (
    recordId: string | number,
    medicalRecordData: MedicalRecordDto
  ): Promise<MedicalRecordDto> => {
    const response = await apiService.put<MedicalRecordDto>(
      `/medical-records/${recordId}`,
      medicalRecordData
    );
    return response.data as MedicalRecordDto;
  },

  /**
   * Delete medical record
   */
  deleteMedicalRecord: async (recordId: string | number): Promise<void> => {
    await apiService.delete(`/medical-records/${recordId}`);
  },
};

export default patientProfileService;
