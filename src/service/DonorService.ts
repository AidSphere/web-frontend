import ApiClient from './ApiClient';
import { ApiResponse } from './ApiService';

// Define interfaces for the data models
interface PrescribedMedicine {
  medicine: string;
  amount: number;
}

interface DonationRequest {
  requestId: number;
  patientId: number;
  title: string;
  description: string;
  prescriptionUrl: string;
  status: string;
  createdAt: string;
  expectedDate: string;
  hospitalName: string;
  adminApprovedAt: string;
  defaultPrice: number;
  remainingPrice: number;
  images: string[];
  documents: string[];
  prescribedMedicines: PrescribedMedicine[];
}

interface DonationPayload {
    donationRequestId: number;
    donationAmount: number;
    donationMessage?: string;
    donationStatus: boolean;
    donationMessageVisibility: boolean;
}

interface Donation {
  donationId: number;
  requestId: number;
  donorId: number;
  amount: number;
  message?: string;
  status: string;
  createdAt: string;
  transactionId?: string;
}

interface DonorProfile {
  donorId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  profileImageUrl?: string;
  createdAt: string;
  totalDonations: number;
  activeDonations: number;
}

interface DonationStats {
  totalDonated: number;
  donationCount: number;
  activeDonations: number;
  completedDonations: number;
  mostRecentDonation?: Donation;
}

interface PaymentMethod {
  id: number;
  type: string;
  lastFour?: string;
  expiryDate?: string;
  cardHolderName?: string;
  isDefault: boolean;
}

interface PaymentMethodPayload {
  type: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardHolderName?: string;
  isDefault?: boolean;
}

interface DonationFilterParams {
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface DonationByRequestId {
  donorName: string;
  donatedAmount: number;
  donationMessage: string | null;
  donationDate: string | null;
  donationRequestTitle: string;
}

// Define the donation history type from the API
interface DonationHistory {
  id: number;
  amount: number;
  message: string | null;
  date: string | null;
  status: boolean;
}

/**
 * Service for donor related operations
 */
class DonorService {
  private readonly API_PATH: string = '/donor';
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  /**
   * Get all patient-accepted donation requests
   * @param filters Optional filters for the donation requests
   * @returns API response with patient-accepted donation requests
   */
  async getPatientAcceptedDonationRequests(filters?: {
    category?: string;
    urgency?: string;
    minAmount?: number;
    maxAmount?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
  }): Promise<ApiResponse<DonationRequest[]>> {
    return this.apiClient.get('/donation-requests/patient-accepted', { params: filters });
  }

  /**
   * Make a donation to a specific request
   * @param donation Donation data
   * @returns API response
   */
  async makeDonation(donation: DonationPayload): Promise<ApiResponse<Donation>> {
    return this.apiClient.post('/donation/payment', donation);
  }

  /**
   * Get donor's donation history
   * @param filters Optional filters for the donation history
   * @returns API response with donor's donation history
   */
  async getDonationHistory(filters?: DonationFilterParams): Promise<ApiResponse<Donation[]>> {
    return this.apiClient.get('/donations/history', { params: filters });
  }

  /**
   * Get donor's donation history
   * @returns API response with donor's donation history
   */
  async getDonorDonationHistory(): Promise<ApiResponse<DonationHistory[]>> {
    return this.apiClient.get(`/donation/donationByUser`);
  }

  /**
   * Get details of a specific donation request
   * @param requestId ID of the donation request
   * @returns API response with donation request details
   */
  async getDonationRequestDetails(requestId: number): Promise<ApiResponse<DonationRequest>> {
    return this.apiClient.get(`/donation-requests/${requestId}`);
  }

  /**
   * Get details of a specific donation
   * @param donationId ID of the donation
   * @returns API response with donation details
   */
  async getDonationDetails(donationId: number): Promise<ApiResponse<Donation>> {
    return this.apiClient.get(`${this.API_PATH}/donations/${donationId}`);
  }

  /**
   * Get all donations for a specific donation request
   * @param requestId ID of the donation request
   * @returns API response with donations for the request
   */
  async getDonationsByRequestId(requestId: number): Promise<ApiResponse<DonationByRequestId[]>> {
    return this.apiClient.get(`/donation/${requestId}`);
  }

  /**
   * Get the donor's profile information
   * @returns API response with donor profile
   */
  async getDonorProfile(): Promise<ApiResponse<DonorProfile>> {
    return this.apiClient.get(`/donor`);
  }

  /**
   * Update the donor's profile information
   * @param profileData Updated profile data
   * @returns API response with updated donor profile
   */
  async updateDonorProfile(profileData: Partial<DonorProfile>): Promise<ApiResponse<DonorProfile>> {
    return this.apiClient.put(`${this.API_PATH}/profile`, profileData);
  }

  /**
   * Upload a profile image
   * @param imageFile Image file to upload
   * @returns API response with the image URL
   */
  async uploadProfileImage(imageFile: File): Promise<ApiResponse<{ imageUrl: string }>> {
    return this.apiClient.uploadFile(
      `${this.API_PATH}/profile/image`,
      imageFile,
      'image'
    );
  }

  /**
   * Search donation requests
   * @param query Search query
   * @param filters Optional filters for the search
   * @returns API response with matching donation requests
   */
  async searchDonationRequests(
    query: string,
    filters?: {
      category?: string;
      sortBy?: string;
      limit?: number;
      page?: number;
    }
  ): Promise<ApiResponse<{ requests: DonationRequest[]; total: number; pages: number }>> {
    return this.apiClient.get('/donation-requests/search', {
      params: {
        query,
        ...filters,
      },
    });
  }

}

export default new DonorService();
export type { 
  DonationRequest, 
  PrescribedMedicine, 
  DonationPayload, 
  Donation,
  DonorProfile,
  DonationStats,
  PaymentMethod,
  PaymentMethodPayload,
  DonationFilterParams,
  DonationByRequestId,
  DonationHistory
};