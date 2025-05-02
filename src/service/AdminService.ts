import axios, { AxiosResponse } from 'axios';

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

class AdminService {
  // Update the API URL to match the successful response you received
  private readonly API_URL: string = 'http://localhost:8080/api/v1/admin';

  // Create axios instance with default config
  private axiosInstance = axios.create({
    baseURL: this.API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // Add request interceptor to add authorization token
    this.axiosInstance.interceptors.request.use((config) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
      return config;
    });
  }

  // Create donor
  async createDonor(donor: Donor): Promise<any> {
    try {
      console.log('Creating donor with data:', donor);
      
      // Validate email isn't already in use
      const formattedDonor = {
        ...donor,
        // Format the date properly if it's a string
        dob: donor.dob instanceof Date ? donor.dob : new Date(donor.dob)
      };
      
      // Use the correct endpoint
      const response: AxiosResponse<any> = await this.axiosInstance.post('/createDonor', formattedDonor);
      console.log('Donor created successfully:', response);
      
      // Handle the response structure properly
      if (response && response.data) {
        return {
          success: true,
          data: response.data.data || response.data,
          message: response.data.message || 'Donor created successfully'
        };
      }
      
      return { success: true, data: response };
    } catch (error: any) {
      console.error('Error registering donor:', error);
      
      // Prepare error response object with detailed information
      const errorResponse = {
        success: false,
        status: error.response?.status || 500,
        message: 'Failed to create donor account'
      };
      
      // Handle specific error codes
      if (error.response) {
        // Extract the error message from the response if available
        if (error.response.data?.message) {
          errorResponse.message = error.response.data.message;
        }
        
        // Handle specific status codes
        switch (error.response.status) {
          case 400:
            errorResponse.message = error.response.data?.message || 'Invalid donor information provided';
            break;
          case 409:
            errorResponse.message = error.response.data?.message || 'A donor with this email or NIC already exists';
            break;
          case 422:
            errorResponse.message = error.response.data?.message || 'Validation failed. Please check your information';
            break;
          case 500:
            errorResponse.message = 'Server error. Please try again later';
            break;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorResponse.message = 'No response from server. Please check your connection';
      } else if (error.message) {
        // Something else happened while setting up the request
        errorResponse.message = error.message;
      }
      
      throw errorResponse;
    }
  }

  // Create patient
  async createPatient(patient: Patient): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post('/patients/register', patient);
      if (response && response.data) {
        return response.data.data || response.data;
      }
      return response;
    } catch (error) {
      console.error('Error registering patient:', error);
      throw error;
    }
  }

  // Create drug importer
  async createDrugImporter(drugImporter: DrugImporter): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post('/drug-importers/register', drugImporter);
      if (response && response.data) {
        return response.data.data || response.data;
      }
      return response;
    } catch (error) {
      console.error('Error registering drug importer:', error);
      throw error;
    }
  }

  // Upload file method for document uploads
  async uploadFile(file: File, type: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/upload', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
      if (response && response.data) {
        // Handle both direct URL returns and nested data structure
        return response.data.url || (response.data.data && response.data.data.url) || '';
      }
      
      return '';
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

export default new AdminService();