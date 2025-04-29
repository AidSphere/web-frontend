'use client';
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
  FaShieldAlt,
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
    fullName: 'Alex Johnson',
    companyName: 'Global Pharma Imports',
    nic: '789012345X',
    email: 'alex.johnson@globalpharma.com',
    phoneNumber: '+94 112 345 678',
    website: 'https://globalpharma.com',
    importerLicense: 'IMP-2023-5678',
    tradeLicenseNumber: 'TL-2023-9876',
    businessType: 'Pharmaceutical Imports',
    vatNumber: 'VAT-456-789',
    taxIdentificationNumber: 'TIN-123-456-789',
    additionalInfo: 'Specialized in importing critical pharmaceutical supplies',
  });

  // Temporary state for editing
  const [editData, setEditData] = useState<ProfileData>({ ...profileData });

  // File upload states
  const [importerLicenseFile, setImporterLicenseFile] = useState<File | null>(
    null
  );
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);

  const router = useRouter();

  // Handle input changes during editing
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
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
        alert('File size should not exceed 5MB');
        return;
      }

      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload PDF, JPG, or PNG files only');
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
      'fullName',
      'companyName',
      'nic',
      'email',
      'phoneNumber',
      'importerLicense',
      'tradeLicenseNumber',
    ];

    const missingFields = requiredFields.filter((field) => !editData[field]);

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields: ${missingFields.join(', ')}`
      );
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Here you would typically send the data to backend
    setProfileData({ ...editData });
    setIsEditing(false);

    // Optional: Show a success notification
    alert('Profile updated successfully!');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditData({ ...profileData });
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
      <div className='space-y-1'>
        <label className='text-foreground/80 text-xs font-medium'>
          {label}
        </label>
        {isEditing ? (
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'>
              <Icon className='text-foreground/40 size-3.5' />
            </div>
            <Input
              name={name}
              value={editData[name]}
              onChange={handleInputChange}
              type={type}
              className='h-9 bg-background py-1 pl-8 text-sm focus:border-primary'
              placeholder={placeholder || label}
            />
          </div>
        ) : (
          <p className='text-sm'>{profileData[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className='relative flex h-screen w-full'>
      {/* Profile Section - Full Width */}
      <div className='flex w-full items-center justify-center p-3 sm:p-5'>
        <Card className='flex h-[95vh] w-full max-w-4xl flex-col overflow-y-auto border-sidebar-border p-4 shadow-lg'>
          {/* Profile header */}
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h1 className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-bold text-transparent sm:text-2xl'>
                Drug Importer Profile
              </h1>
              <p className='text-foreground/70 text-sm'>
                Manage your professional information
              </p>
            </div>

            {/* Edit/Save Toggle */}
            <div className='flex space-x-2'>
              {!isEditing ? (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setIsEditing(true)}
                  className='flex items-center space-x-2'
                >
                  <FaEdit className='mr-2' /> Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleCancelEdit}
                    className='text-destructive flex items-center space-x-2'
                  >
                    <FaTimesCircle className='mr-2' /> Cancel
                  </Button>
                  <Button
                    size='sm'
                    onClick={handleSaveProfile}
                    className='flex items-center space-x-2'
                  >
                    <FaSave className='mr-2' /> Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <form className='flex grow flex-col'>
            <div className='grid grow grid-cols-1 gap-3'>
              {/* Personal and Company Details Grid */}
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
                {renderEditableField('fullName', 'Full Name', FaUser)}
                {renderEditableField('companyName', 'Company Name', FaIndustry)}
                {renderEditableField('nic', 'NIC', FaIdCard)}
                {renderEditableField('email', 'Email', FaEnvelope, 'email')}
                {renderEditableField(
                  'phoneNumber',
                  'Phone Number',
                  FaPhone,
                  'tel'
                )}
                {renderEditableField('website', 'Website', FaGlobe, 'url')}
              </div>

              {/* Business and License Details */}
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
                {renderEditableField(
                  'importerLicense',
                  'Importer License',
                  FaFileAlt
                )}
                {renderEditableField(
                  'tradeLicenseNumber',
                  'Trade License',
                  FaFileAlt
                )}
                {renderEditableField(
                  'businessType',
                  'Business Type',
                  FaIndustry
                )}
                {renderEditableField('vatNumber', 'VAT Number', FaFileAlt)}
                {renderEditableField(
                  'taxIdentificationNumber',
                  'Tax ID',
                  FaFileAlt
                )}
              </div>

              {/* Additional Information */}
              <div className='space-y-1'>
                <label className='text-foreground/80 text-xs font-medium'>
                  Additional Information
                </label>
                {isEditing ? (
                  <Textarea
                    name='additionalInfo'
                    value={editData.additionalInfo}
                    onChange={handleInputChange}
                    className='h-16 min-h-[60px] resize-none bg-background text-sm focus:border-primary'
                    placeholder='Additional details about your import business'
                  />
                ) : (
                  <p className='text-sm'>{profileData.additionalInfo}</p>
                )}
              </div>

              {/* File Upload Section */}
              {isEditing && (
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  {/* Importer License Proof */}
                  <div className='space-y-1'>
                    <label className='text-foreground/80 text-xs font-medium'>
                      Importer License Proof
                    </label>
                    <div className='flex w-full items-center justify-center'>
                      <label className='flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-sidebar-border bg-background transition-colors hover:bg-primary/5'>
                        <div className='flex items-center justify-center space-x-2'>
                          <FaFileUpload className='size-5 text-primary' />
                          <div>
                            <p className='text-foreground/70 text-xs font-semibold'>
                              {importerLicenseFile
                                ? importerLicenseFile.name
                                : 'Upload Importer License'}
                            </p>
                            <p className='text-foreground/50 text-xs'>
                              PDF, JPG, PNG (MAX. 5MB)
                            </p>
                          </div>
                        </div>
                        <input
                          type='file'
                          className='hidden'
                          onChange={(e) =>
                            handleFileChange(e, 'importerLicense')
                          }
                          accept='.pdf,.jpg,.jpeg,.png'
                        />
                      </label>
                    </div>
                  </div>

                  {/* Trade License Proof */}
                  <div className='space-y-1'>
                    <label className='text-foreground/80 text-xs font-medium'>
                      Trade License Proof
                    </label>
                    <div className='flex w-full items-center justify-center'>
                      <label className='flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-sidebar-border bg-background transition-colors hover:bg-primary/5'>
                        <div className='flex items-center justify-center space-x-2'>
                          <FaFileUpload className='size-5 text-primary' />
                          <div>
                            <p className='text-foreground/70 text-xs font-semibold'>
                              {tradeLicenseFile
                                ? tradeLicenseFile.name
                                : 'Upload Trade License'}
                            </p>
                            <p className='text-foreground/50 text-xs'>
                              PDF, JPG, PNG (MAX. 5MB)
                            </p>
                          </div>
                        </div>
                        <input
                          type='file'
                          className='hidden'
                          onChange={(e) => handleFileChange(e, 'tradeLicense')}
                          accept='.pdf,.jpg,.jpeg,.png'
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className='mt-3 space-y-2 pt-2'>
              {/* Account Status and Verification */}
              <div className='flex items-center justify-between rounded-lg border border-sidebar-border bg-background p-3'>
                <div className='flex items-center space-x-2'>
                  <FaShieldAlt className='text-primary' />
                  <div>
                    <h3 className='text-sm font-medium'>Account Status</h3>
                    <p className='text-foreground/70 text-xs'>
                      Verified Drug Importer
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='text-xs font-medium text-green-600'>
                    Active
                  </span>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                </div>
              </div>

              {/* Account Management Options */}
              <div className='grid grid-cols-2 gap-2'>
                {/* Change Contact Preferences */}
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    // Implement contact preferences modal/page
                    router.push('/contact-preferences');
                  }}
                  className='w-full'
                >
                  Contact Preferences
                </Button>

                {/* Security Settings */}
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    router.push('/security-settings');
                  }}
                  className='w-full'
                >
                  Security Settings
                </Button>
              </div>

              {/* Deactivate Account Option */}
              <Button
                variant='destructive'
                className='mt-2 w-full'
                onClick={() => {
                  // Create a modal or confirmation dialog for account deactivation
                  const confirmDeactivate = window.confirm(
                    'Are you sure you want to deactivate your account? This action will:\n' +
                      '- Suspend your active import licenses\n' +
                      '- Remove access to the platform\n' +
                      '- Permanently delete your profile data\n\n' +
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
                        alert(
                          'Failed to deactivate account. Please try again.'
                        );
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
              <div className='mt-4 text-center'>
                <div className='text-foreground/70 flex justify-center space-x-4 text-xs'>
                  <Link
                    href='/privacy-policy'
                    className='transition-colors hover:text-primary'
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href='/terms-of-service'
                    className='transition-colors hover:text-primary'
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href='/support'
                    className='transition-colors hover:text-primary'
                  >
                    Support
                  </Link>
                </div>
                <p className='text-foreground/50 mt-2 text-xs'>
                  © {new Date().getFullYear()} Drug Importer Portal. All rights
                  reserved.
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
