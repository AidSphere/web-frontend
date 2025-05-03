'use client';
import { useState, useEffect } from 'react';
import type React from 'react';
// Replace direct axios import with ApiClient
import ApiClient from '@/service/ApiClient';
import { jsPDF } from 'jspdf';

import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Divider,
  Tooltip,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import { z } from 'zod';
import {
  User,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Edit2,
  Save,
  X,
  Download,
  Lock,
  Camera,
  CheckCircle2,
  Calendar,
  FileText,
  Eye,
  EyeOff,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  nic: z.string().min(1, 'NIC Number is required')
    .refine(
      (value) => {
        // Old NIC format: 9 digits followed by V or X
        const oldNicPattern = /^\d{9}[VvXx]$/;
        // New NIC format: 12 digits
        const newNicPattern = /^\d{12}$/;
        return oldNicPattern.test(value) || newNicPattern.test(value);
      },
      {
        message: 'Invalid NIC format. Use 9 digits + V/X (old) or 12 digits (new)',
      }
    ),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone Number must be at least 10 characters'),
  dob: z.string().optional()
    .refine(
      (value) => {
        if (!value) return true; // Optional field
        const selectedDate = new Date(value);
        const today = new Date();
        return selectedDate <= today;
      },
      {
        message: 'Date of birth cannot be in the future',
      }
    ),
  address: z.string().optional(),
  description: z.string().optional(),
});

// Password schema with validation
const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(8, 'Confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Type for profile data from API
interface ProfileData {
  id: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  dob: string | null;
  address: string | null;
  description: string | null;
  donations: any[] | null;
}

const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const result = passwordSchema.safeParse(passwordData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setPasswordErrors(fieldErrors);
        return;
      }

      setIsLoading(true);
      // Here you would make the API call to change password
      // For now, we'll simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setPasswordChangeSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Close modal after 2 seconds of showing success
      setTimeout(() => {
        onClose();
        setPasswordChangeSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordErrors({ 
        form: 'An error occurred while changing your password. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="text-xl font-semibold">Change Password</div>
          <div className="text-sm text-gray-500">
            Please enter your current password and a new password
          </div>
        </ModalHeader>
        <ModalBody>
          {passwordChangeSuccess ? (
            <div className="mb-4 flex items-center rounded-lg bg-green-50 p-4 text-green-700">
              <CheckCircle2 size={20} className="mr-2" />
              Your password has been successfully changed!
            </div>
          ) : (
            <>
              {passwordErrors.form && (
                <div className="mb-4 flex items-center rounded-lg bg-red-50 p-3 text-red-700">
                  <X size={18} className="mr-2" />
                  {passwordErrors.form}
                </div>
              )}
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <div className="relative">
                    <Input
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      type={showCurrentPassword ? "text" : "password"}
                      variant="bordered"
                      placeholder="Enter your current password"
                      isInvalid={!!passwordErrors.currentPassword}
                      errorMessage={passwordErrors.currentPassword}
                      endContent={
                        <button 
                          type="button" 
                          onClick={() => togglePasswordVisibility('current')}
                          className="focus:outline-none"
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={16} className="text-gray-400" />
                          ) : (
                            <Eye size={16} className="text-gray-400" />
                          )}
                        </button>
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <div className="relative">
                    <Input
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      type={showNewPassword ? "text" : "password"}
                      variant="bordered"
                      placeholder="Enter your new password"
                      isInvalid={!!passwordErrors.newPassword}
                      errorMessage={passwordErrors.newPassword}
                      endContent={
                        <button 
                          type="button" 
                          onClick={() => togglePasswordVisibility('new')}
                          className="focus:outline-none"
                        >
                          {showNewPassword ? (
                            <EyeOff size={16} className="text-gray-400" />
                          ) : (
                            <Eye size={16} className="text-gray-400" />
                          )}
                        </button>
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      type={showConfirmPassword ? "text" : "password"}
                      variant="bordered"
                      placeholder="Confirm your new password"
                      isInvalid={!!passwordErrors.confirmPassword}
                      errorMessage={passwordErrors.confirmPassword}
                      endContent={
                        <button 
                          type="button" 
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="focus:outline-none"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} className="text-gray-400" />
                          ) : (
                            <Eye size={16} className="text-gray-400" />
                          )}
                        </button>
                      }
                    />
                  </div>
                </div>

                {/* Password requirements */}
                <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                  <p className="font-medium mb-2">Password requirements:</p>
                  <ul className="space-y-1 list-disc pl-5">
                    <li className={cn(
                      passwordData.newPassword.length >= 8 ? "text-green-600" : "text-gray-500"
                    )}>
                      At least 8 characters
                    </li>
                    <li className={cn(
                      /[A-Z]/.test(passwordData.newPassword) ? "text-green-600" : "text-gray-500"
                    )}>
                      At least one uppercase letter
                    </li>
                    <li className={cn(
                      /[a-z]/.test(passwordData.newPassword) ? "text-green-600" : "text-gray-500"
                    )}>
                      At least one lowercase letter
                    </li>
                    <li className={cn(
                      /[0-9]/.test(passwordData.newPassword) ? "text-green-600" : "text-gray-500"
                    )}>
                      At least one number
                    </li>
                    <li className={cn(
                      /[^A-Za-z0-9]/.test(passwordData.newPassword) ? "text-green-600" : "text-gray-500"
                    )}>
                      At least one special character
                    </li>
                    <li className={cn(
                      passwordData.newPassword === passwordData.confirmPassword && 
                      passwordData.confirmPassword.length > 0 ? 
                      "text-green-600" : "text-gray-500"
                    )}>
                      Passwords match
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="flat" 
            color="danger" 
            onPress={onClose}
            isDisabled={isLoading || passwordChangeSuccess}
          >
            Cancel
          </Button>
          <Button 
            color="primary" 
            onPress={handlePasswordSubmit}
            isLoading={isLoading}
            isDisabled={isLoading || passwordChangeSuccess}
          >
            Change Password
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    id: null,
    firstName: '',
    lastName: '',
    nic: '',
    email: '',
    phone: '',
    dob: null,
    address: null,
    description: null,
    donations: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  // Create ApiClient instance
  const apiClient = ApiClient.getInstance();

  // Function to fetch profile data from the backend
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // Replace direct axios call with ApiClient call
      const response = await apiClient.get('/donor');
      
      if (response.success && response.data) {
        setFormData(response.data);
      } else {
        console.error('Error in profile response:', response.message);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
    fetchProfileData();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleUpdateClick = async () => {
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      setLoading(true);

      try {
        // Replace direct API call with ApiClient call
        const response = await apiClient.put('/donor', formData);
        
        if (response.success) {
          setSaveSuccess(true);
          setIsEditing(false);
        } else {
          console.error('Error updating profile:', response.message);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePhotoUpload = () => {
    // This would trigger a file upload dialog in a real implementation
    console.log('Upload photo clicked');
  };

  const handleDownloadData = () => {
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 255);
      doc.text("User Profile Data", 105, 20, { align: 'center' });
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 105, 30, { align: 'center' });
      
      // Add horizontal line
      doc.setDrawColor(0, 0, 0);
      doc.line(20, 35, 190, 35);
      
      // Add personal information
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text("Personal Information", 20, 45);
      
      // Set for regular text
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Add profile details
      let y = 55;
      const lineHeight = 10;
      
      // Add full name
      doc.setFont(undefined, 'bold');
      doc.text("Full Name:", 20, y);
      doc.setFont(undefined, 'normal');
      doc.text(`${formData.firstName} ${formData.lastName}`, 70, y);
      y += lineHeight;
      
      // Add NIC
      doc.setFont(undefined, 'bold');
      doc.text("NIC Number:", 20, y);
      doc.setFont(undefined, 'normal');
      doc.text(formData.nic || "Not provided", 70, y);
      y += lineHeight;
      
      // Add Email
      doc.setFont(undefined, 'bold');
      doc.text("Email:", 20, y);
      doc.setFont(undefined, 'normal');
      doc.text(formData.email || "Not provided", 70, y);
      y += lineHeight;
      
      // Add Phone
      doc.setFont(undefined, 'bold');
      doc.text("Phone:", 20, y);
      doc.setFont(undefined, 'normal');
      doc.text(formData.phone || "Not provided", 70, y);
      y += lineHeight;
      
      // Add DOB
      doc.setFont(undefined, 'bold');
      doc.text("Date of Birth:", 20, y);
      doc.setFont(undefined, 'normal');
      doc.text(formData.dob ? format(new Date(formData.dob), 'PPP') : "Not provided", 70, y);
      y += lineHeight;
      
      // Add Address
      doc.setFont(undefined, 'bold');
      doc.text("Address:", 20, y);
      doc.setFont(undefined, 'normal');
      doc.text(formData.address || "Not provided", 70, y);
      y += lineHeight;
      
      // Add note at bottom
      y += 20;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("This document contains personal information. Please keep it confidential.", 105, y, { align: 'center' });
      
      // Save the PDF
      doc.save(`${formData.firstName}_${formData.lastName}_Profile.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getFullName = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName} ${formData.lastName}`;
    }
    return 'User Profile';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not provided';
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className='mx-auto max-w-5xl px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-center text-3xl font-bold text-gray-800'>
          My Profile
        </h1>
        <p className='mt-2 text-center text-gray-500'>
          Manage your personal information and account settings
        </p>
      </div>

      {loading && !formData.firstName ? (
        <div className='flex h-64 items-center justify-center'>
          <Spinner size='lg' color='primary' />
          <span className='ml-2 text-gray-600'>Loading your profile...</span>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Profile Summary Card */}
          <Card className='lg:col-span-1'>
            <CardBody className='flex flex-col items-center py-8'>
              <div className='group relative mb-6'>
                <Avatar
                  src='https://heroui.com/images/hero-card-complete.jpeg'
                  className='h-32 w-32 text-large'
                  isBordered
                  color='primary'
                />
                {isEditing && (
                  <Tooltip content='Change profile picture'>
                    <Button
                      isIconOnly
                      className='absolute bottom-0 right-0 rounded-full bg-primary text-white'
                      size='sm'
                      onClick={handlePhotoUpload}
                    >
                      <Camera size={16} />
                    </Button>
                  </Tooltip>
                )}
              </div>

              <h2 className='mb-1 text-xl font-semibold'>{getFullName()}</h2>
              <p className='mb-4 text-gray-500'>{formData.email}</p>

              <div className='mt-4 w-full space-y-3'>
                <div className='flex items-center text-gray-600'>
                  <CreditCard size={18} className='mr-2' />
                  <span>{formData.nic || 'No NIC provided'}</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <Phone size={18} className='mr-2' />
                  <span>{formData.phone || 'No phone provided'}</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <MapPin size={18} className='mr-2' />
                  <span>{formData.address || 'No address provided'}</span>
                </div>
                {formData.dob && (
                  <div className='flex items-center text-gray-600'>
                    <Calendar size={18} className='mr-2' />
                    <span>{formatDate(formData.dob)}</span>
                  </div>
                )}
              </div>

              <Divider className='my-6' />

              <div className='w-full space-y-3'>
                <Button
                  color='primary'
                  variant='flat'
                  startContent={<Download size={16} />}
                  className='w-full'
                  onClick={handleDownloadData}
                >
                  Download My Data
                </Button>

                <Button
                  color='secondary'
                  variant='flat'
                  startContent={<Lock size={16} />}
                  className='w-full'
                  onClick={() => setIsChangePasswordModalOpen(true)}
                >
                  Change Password
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Profile Edit Card */}
          <Card className='lg:col-span-2'>
            <CardHeader className='flex items-center justify-between px-6 py-5'>
              <h3 className='text-xl font-semibold'>Personal Information</h3>
              {!isEditing ? (
                <Button
                  color='primary'
                  variant='flat'
                  startContent={<Edit2 size={16} />}
                  onClick={handleEditClick}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className='text-sm text-gray-500'>Editing mode active</div>
              )}
            </CardHeader>

            <Divider />

            <CardBody className='px-6 py-5'>
              {saveSuccess && (
                <div className='mb-4 flex items-center rounded-lg bg-green-50 p-3 text-green-700'>
                  <CheckCircle2 size={18} className='mr-2' />
                  Profile updated successfully!
                </div>
              )}

              <form className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <User size={16} className='mr-1 text-gray-500' />
                    First Name
                  </label>
                  <Input
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your first name'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName}
                    className='w-full'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <User size={16} className='mr-1 text-gray-500' />
                    Last Name
                  </label>
                  <Input
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your last name'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName}
                    className='w-full'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <CreditCard size={16} className='mr-1 text-gray-500' />
                    NIC Number
                  </label>
                  <Input
                    name='nic'
                    value={formData.nic}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your NIC number'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.nic}
                    errorMessage={errors.nic}
                    className='w-full'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <Mail size={16} className='mr-1 text-gray-500' />
                    Email Address
                  </label>
                  <Input
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your email'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    className='w-full'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <Phone size={16} className='mr-1 text-gray-500' />
                    Phone Number
                  </label>
                  <Input
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your phone number'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone}
                    className='w-full'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <Calendar size={16} className='mr-1 text-gray-500' />
                    Date of Birth
                  </label>
                  <Input
                    name='dob'
                    type="date"
                    value={formData.dob ? formData.dob.split('T')[0] : ''}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Select your date of birth'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.dob}
                    errorMessage={errors.dob}
                    className='w-full'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <MapPin size={16} className='mr-1 text-gray-500' />
                    Address
                  </label>
                  <Input
                    name='address'
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your address'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.address}
                    errorMessage={errors.address}
                    className='w-full'
                  />
                </div>
              </form>
            </CardBody>

            {isEditing && (
              <>
                <Divider />
                <CardFooter className='flex justify-end gap-3 px-6 py-4'>
                  <Button
                    variant='flat'
                    color='danger'
                    startContent={<X size={16} />}
                    onClick={handleCancelClick}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    color='primary'
                    startContent={loading ? null : <Save size={16} />}
                    onClick={handleUpdateClick}
                    isLoading={loading}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Password Change Modal */}
      <ChangePasswordModal 
        isOpen={isChangePasswordModalOpen} 
        onClose={() => setIsChangePasswordModalOpen(false)} 
      />
    </div>
  );
};

export default Profile;
