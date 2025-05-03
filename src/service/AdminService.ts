import ApiClient from './ApiClient';
import { ApiResponse } from './ApiService';

// Define interfaces for the data models
interface User {
  id?: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: Date;
}

// Define Donor interface based on DTO
interface Donor {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  dob: Date;
  address: string;
  password: string;
}

// Define Patient interface based on DTO
interface Patient {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  phoneNumber: string;
  email: string;
  permanentAddress: string;
  currentAddress?: string;
  profileImageUrl?: string;
  governmentIdType: string;
  governmentIdNumber: string;
  governmentIdDocumentUrl: string;
}

// Define DrugImporter interface based on DTO
interface DrugImporter {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  licenseNumber: string;
  website?: string;
  nic: string;
  additionalText?: string;
  nicotineProofUrl?: string;
  licenseProofUrl?: string;
}

// Define PendingDrugImporter interface for approval requests
interface PendingDrugImporter {
  id: number;
  email: string;
  name: string;
  phone: string;
  address: string | null;
  licenseNumber: string;
  nicotineProofFilePath: string | null;
  licenseProofFilePath: string | null;
  enabled: boolean;
}

// Define PendingPatient interface for approval requests
interface PendingPatient {
  patientId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  permanentAddress: string;
  currentAddress: string | null;
  profileImageUrl: string | null;
}

// Define PrescribedMedicine interface
interface PrescribedMedicine {
  medicine: string;
  amount: number;
}

// Define PendingDonationRequest interface
interface PendingDonationRequest {
  requestId: number;
  patientId: number;
  title: string;
  description: string;
  prescriptionUrl: string;
  status: string;
  createdAt: string;
  expectedDate: string;
  hospitalName: string;
  images: string[];
  documents: string[];
  prescribedMedicines: PrescribedMedicine[];
}

// Define ApprovalPayload interface
interface ApprovalPayload {
  status: string;
  messageToPatient: string;
}

/**
 * Service for admin related operations
 */
class AdminService {
  private readonly API_PATH: string = '/admin';
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  /**
   * Create a new donor account
   * @param donor Donor data
   * @returns API response
   */
  async createDonor(donor: Donor): Promise<ApiResponse> {
    console.log('Creating donor with data:', donor);
    
    // Format the date properly if it's a string
    const formattedDonor = {
      ...donor,
      dob: donor.dob instanceof Date ? donor.dob : new Date(donor.dob)
    };
    
    return this.apiClient.post(`${this.API_PATH}/createDonor`, formattedDonor);
  }

  /**
   * Create a new patient account
   * @param patient Patient data
   * @returns API response
   */
  async createPatient(patient: Patient): Promise<ApiResponse> {
    return this.apiClient.post(`${this.API_PATH}/createDrgImporter`, patient);
  }

  /**
   * Create a new drug importer account
   * @param drugImporter Drug importer data
   * @returns API response
   */
  async createDrugImporter(drugImporter: DrugImporter): Promise<ApiResponse> {
    return this.apiClient.post(`${this.API_PATH}/createDrgImporter`, drugImporter);
  }

  /**
   * Get all pending drug importer requests
   * @returns API response with pending drug importers
   */
  async getPendingDrugImporters(): Promise<ApiResponse<PendingDrugImporter[]>> {
    return this.apiClient.get(`${this.API_PATH}/access/drug-importer/pending`);
  }

  /**
   * Approve a drug importer request
   * @param email Email of the drug importer to approve
   * @returns API response
   */
  async approveDrugImporter(email: string): Promise<ApiResponse> {
    return this.apiClient.post(`${this.API_PATH}/access/approve/${email}`);
  }

  /**
   * Reject a drug importer request
   * @param email Email of the drug importer to reject
   * @returns API response
   */
  async rejectDrugImporter(email: string): Promise<ApiResponse> {
    return this.apiClient.post(`${this.API_PATH}/access/reject/${email}`);
  }

  /**
   * Get all pending patient requests
   * @returns API response with pending patients
   */
  async getPendingPatients(): Promise<ApiResponse<PendingPatient[]>> {
    return this.apiClient.get(`${this.API_PATH}/access/patient/pending`);
  }

  /**
   * Approve a patient request
   * @param email Email of the patient to approve
   * @returns API response
   */
  async approvePatient(email: string): Promise<ApiResponse> {
    return this.apiClient.post(`${this.API_PATH}/access/approve/${email}`);
  }

  /**
   * Reject a patient request
   * @param email Email of the patient to reject
   * @returns API response
   */
  async rejectPatient(email: string): Promise<ApiResponse> {
    return this.apiClient.post(`${this.API_PATH}/access/reject/${email}`);
  }

  /**
   * Get all pending donation requests
   * @returns API response with pending donation requests
   */
  async getPendingDonationRequests(): Promise<ApiResponse<PendingDonationRequest[]>> {
    return this.apiClient.get(`/donation-requests/pending`);
  }

  /**
   * Approve a donation request
   * @param requestId ID of the donation request to approve
   * @param message Optional message to the patient
   * @returns API response
   */
  async approveDonationRequest(requestId: number, message: string = 'Your donation request has been approved.'): Promise<ApiResponse> {
    const payload: ApprovalPayload = {
      status: 'ADMIN_APPROVED',
      messageToPatient: message
    };
    return this.apiClient.put(`/donation-requests/${requestId}/approve`, payload);
  }

  /**
   * Reject a donation request
   * @param requestId ID of the donation request to reject
   * @param message Optional message to the patient explaining the rejection
   * @returns API response
   */
  async rejectDonationRequest(requestId: number, message: string = 'Your donation request has been rejected.'): Promise<ApiResponse> {
    const payload: ApprovalPayload = {
      status: 'REJECTED',
      messageToPatient: message
    };
    return this.apiClient.put(`/donation-requests/${requestId}/approve`, payload);
  }

  /**
   * Upload a file
   * @param file File to upload
   * @param type File type
   * @returns URL of the uploaded file
   */
  async uploadFile(file: File, type: string): Promise<string> {
    const response = await this.apiClient.uploadFile(
      `${this.API_PATH}/upload`, 
      file, 
      'file', 
      { type }
    );
    
    if (response.success && response.data) {
      // Handle both direct URL returns and nested data structure
      return response.data.url || (response.data.data && response.data.data.url) || '';
    }
    
    return '';
  }
}

export default new AdminService();