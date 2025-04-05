"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  FaUser, 
  FaIdCard, 
  FaGlobe, 
  FaFileAlt, 
  FaPhone, 
  FaEnvelope, 
  FaEdit, 
  FaSave, 
  FaTimesCircle,
  FaFileUpload,
  FaIndustry,
  FaShieldAlt
} from 'react-icons/fa';
import { Textarea } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { ThemeModeToggle } from '@/components/ThemeModeToggle'; // Assuming you have this component

// Type definition for profile data
type ProfileData = {
  fullName: string;
  companyName: string;
  nic: string;
  email: string;
  phoneNumber: string;
  website: string;
  importerLicense: string;
  tradeLicenseNumber: string;
  businessType: string;
  vatNumber: string;
  taxIdentificationNumber: string;
  additionalInfo: string;
};

const DrugImporterProfilePage: React.FC = () => {
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Profile information state
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Alex Johnson",
    companyName: "Global Pharma Imports",
    nic: "789012345X",
    email: "alex.johnson@globalpharma.com",
    phoneNumber: "+94 112 345 678",
    website: "https://globalpharma.com",
    importerLicense: "IMP-2023-5678",
    tradeLicenseNumber: "TL-2023-9876",
    businessType: "Pharmaceutical Imports",
    vatNumber: "VAT-456-789",
    taxIdentificationNumber: "TIN-123-456-789",
    additionalInfo: "Specialized in importing critical pharmaceutical supplies"
  });

  // Temporary state for editing
  const [editData, setEditData] = useState<ProfileData>({...profileData});

  // File upload states
  const [importerLicenseFile, setImporterLicenseFile] = useState<File | null>(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);

  const router = useRouter();

  // Handle input changes during editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input changes
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    fileType: 'importerLicense' | 'tradeLicense'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }

      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert("Please upload PDF, JPG, or PNG files only");
        return;
      }

      if (fileType === 'importerLicense') {
        setImporterLicenseFile(file);
      } else {
        setTradeLicenseFile(file);
      }
    }
  };

  // Save profile changes
  const handleSaveProfile = () => {
    // Validate required fields
    const requiredFields: (keyof ProfileData)[] = [
      'fullName', 'companyName', 'nic', 'email', 
      'phoneNumber', 'importerLicense', 'tradeLicenseNumber'
    ];

    const missingFields = requiredFields.filter(field => !editData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Here you would typically send the data to backend
    setProfileData({...editData});
    setIsEditing(false);
    
    // Optional: Show a success notification
    alert("Profile updated successfully!");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditData({...profileData});
    setIsEditing(false);
  };

  // Render input field with icon
  const renderEditableField = (
    name: keyof ProfileData, 
    label: string, 
    Icon: React.ElementType, 
    type: string = 'text', 
    placeholder?: string
  ) => {
    return (
      <div className="space-y-1">
        <label className="text-xs font-medium text-foreground/80">
          {label}
        </label>
        {isEditing ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Icon className="size-3.5 text-foreground/40" />
            </div>
            <Input 
              name={name}
              value={editData[name]}
              onChange={handleInputChange}
              type={type}
              className="pl-8 py-1 h-9 text-sm bg-background focus:border-primary"
              placeholder={placeholder || label}
            />
          </div>
        ) : (
          <p className="text-sm">{profileData[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full relative">
      

      {/* Profile Section - Full Width */}
      <div className="w-full flex items-center justify-center p-3 sm:p-5">
        <Card className="w-full max-w-4xl h-[95vh] p-4 shadow-lg border-sidebar-border flex flex-col overflow-y-auto">
          {/* Profile header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Drug Importer Profile
              </h1>
              <p className="text-sm text-foreground/70">
                Manage your professional information
              </p>
            </div>
            
            {/* Edit/Save Toggle */}
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 text-destructive"
                  >
                    <FaTimesCircle className="mr-2" /> Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Profile Form */}
          <form className="flex flex-col grow">
            <div className="grow grid grid-cols-1 gap-3">
              {/* Personal and Company Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {renderEditableField('fullName', 'Full Name', FaUser)}
                {renderEditableField('companyName', 'Company Name', FaIndustry)}
                {renderEditableField('nic', 'NIC', FaIdCard)}
                {renderEditableField('email', 'Email', FaEnvelope, 'email')}
                {renderEditableField('phoneNumber', 'Phone Number', FaPhone, 'tel')}
                {renderEditableField('website', 'Website', FaGlobe, 'url')}
              </div>

              {/* Business and License Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {renderEditableField('importerLicense', 'Importer License', FaFileAlt)}
                {renderEditableField('tradeLicenseNumber', 'Trade License', FaFileAlt)}
                {renderEditableField('businessType', 'Business Type', FaIndustry)}
                {renderEditableField('vatNumber', 'VAT Number', FaFileAlt)}
                {renderEditableField('taxIdentificationNumber', 'Tax ID', FaFileAlt)}
              </div>

              {/* Additional Information */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/80">
                  Additional Information
                </label>
                {isEditing ? (
                  <Textarea 
                    name="additionalInfo"
                    value={editData.additionalInfo}
                    onChange={handleInputChange}
                    className="bg-background min-h-[60px] h-16 text-sm focus:border-primary resize-none"
                    placeholder="Additional details about your import business"
                  />
                ) : (
                  <p className="text-sm">{profileData.additionalInfo}</p>
                )}
              </div>

              {/* File Upload Section */}
              {isEditing && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Importer License Proof */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/80">
                      Importer License Proof
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-primary/5 border-sidebar-border transition-colors">
                        <div className="flex items-center justify-center space-x-2">
                          <FaFileUpload className="size-5 text-primary" />
                          <div>
                            <p className="text-xs font-semibold text-foreground/70">
                              {importerLicenseFile ? importerLicenseFile.name : "Upload Importer License"}
                            </p>
                            <p className="text-xs text-foreground/50">PDF, JPG, PNG (MAX. 5MB)</p>
                          </div>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(e, 'importerLicense')}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Trade License Proof */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground/80">
                      Trade License Proof
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-primary/5 border-sidebar-border transition-colors">
                        <div className="flex items-center justify-center space-x-2">
                          <FaFileUpload className="size-5 text-primary" />
                          <div>
                            <p className="text-xs font-semibold text-foreground/70">
                              {tradeLicenseFile ? tradeLicenseFile.name : "Upload Trade License"}
                            </p>
                            <p className="text-xs text-foreground/50">PDF, JPG, PNG (MAX. 5MB)</p>
                          </div>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(e, 'tradeLicense')}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="pt-2 space-y-2 mt-3">
              {/* Account Status and Verification */}
              <div className="bg-background border border-sidebar-border rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FaShieldAlt className="text-primary" />
                  <div>
                    <h3 className="text-sm font-medium">Account Status</h3>
                    <p className="text-xs text-foreground/70">
                      Verified Drug Importer
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-600 font-medium">
                    Active
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Account Management Options */}
              <div className="grid grid-cols-2 gap-2">
                {/* Change Contact Preferences */}
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Implement contact preferences modal/page
                    router.push('/contact-preferences');
                  }}
                  className="w-full"
                >
                  Contact Preferences
                </Button>

                {/* Security Settings */}
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    router.push('/security-settings');
                  }}
                  className="w-full"
                >
                  Security Settings
                </Button>
              </div>

              {/* Deactivate Account Option */}
              <Button variant="destructive" 
                className="w-full mt-2"
                onClick={() => {
                  // Create a modal or confirmation dialog for account deactivation
                  const confirmDeactivate = window.confirm(
                    "Are you sure you want to deactivate your account? This action will:\n" +
                    "- Suspend your active import licenses\n" +
                    "- Remove access to the platform\n" +
                    "- Permanently delete your profile data\n\n" +
                    "Type 'DEACTIVATE' to confirm:"
                  );

                  if (confirmDeactivate) {
                    const userConfirmation = window.prompt(
                      "Please type 'DEACTIVATE' to confirm account deactivation:"
                    );

                    if (userConfirmation === 'DEACTIVATE') {
                      // TODO: Implement actual account deactivation logic
                      // This would typically involve:
                      // 1. Calling a backend API to deactivate the account
                      // 2. Logging out the user
                      // 3. Clearing local storage
                      try {
                        // Placeholder for backend deactivation call
                        // await deactivateAccount();

                        // Clear user data
                        localStorage.clear();
                        sessionStorage.clear();

                        // Redirect to deactivation confirmation page
                        router.push('/account/deactivated');
                      } catch (error) {
                        console.error('Account deactivation failed', error);
                        alert('Failed to deactivate account. Please try again.');
                      }
                    } else {
                      alert('Account deactivation cancelled.');
                    }
                  }
                }}
              >
                Deactivate Account
              </Button>

              {/* Footer Links */}
              <div className="text-center mt-4">
                <div className="flex justify-center space-x-4 text-xs text-foreground/70">
                  <Link 
                    href="/privacy-policy" 
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="/terms-of-service" 
                    className="hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link 
                    href="/support" 
                    className="hover:text-primary transition-colors"
                  >
                    Support
                  </Link>
                </div>
                <p className="text-xs text-foreground/50 mt-2">
                  © {new Date().getFullYear()} Drug Importer Portal. All rights reserved.
                </p>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
export default DrugImporterProfilePage;