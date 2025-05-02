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