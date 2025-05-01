'use client';
import { useState, useEffect } from 'react';
import type React from 'react';

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
} from '@heroui/react';
import { z } from 'zod';
import ChangePasswordModal from '../home/[donationId]/_components/changePassword';
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
} from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  nicNumber: z.string().min(1, 'NIC Number is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone Number must be at least 10 characters'),
  address: z.string().optional(),
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nicNumber: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Function to fetch profile data from the backend
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // Simulating API call with mock data for demonstration
      // In a real app, you would fetch from your API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        nicNumber: '982750183V',
        email: 'john.doe@example.com',
        phoneNumber: '0771234567',
        address: '123 Main Street, Colombo',
      };

      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        nicNumber: data.nicNumber || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
      });
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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Form data:', result.data);
        setSaveSuccess(true);
        setIsEditing(false);
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
    // This would handle downloading user data in a real implementation
    console.log('Download data clicked');
  };

  const getFullName = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName} ${formData.lastName}`;
    }
    return 'User Profile';
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
              <p className='mb-4 text-gray-500' id='email-display'>
                {formData.email}
              </p>

              <div className='mt-4 w-full space-y-3'>
                <div className='flex items-center text-gray-600'>
                  <CreditCard size={18} className='mr-2' />
                  <span id='nic-display'>
                    {formData.nicNumber || 'No NIC provided'}
                  </span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <Phone size={18} className='mr-2' />
                  <span id='phone-display'>
                    {formData.phoneNumber || 'No phone provided'}
                  </span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <MapPin size={18} className='mr-2' />
                  <span id='add-display'>
                    {formData.address || 'No address provided'}
                  </span>
                </div>
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

                <ChangePasswordModal>
                  <Button
                    color='secondary'
                    variant='flat'
                    startContent={<Lock size={16} />}
                    className='w-full'
                  >
                    Change Password
                  </Button>
                </ChangePasswordModal>
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
                <div className='success-alert mb-4 flex items-center rounded-lg bg-green-50 p-3 text-green-700'>
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
                    className='first-name-input w-full'
                    id='first-name-field' // Added static ID
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
                    className='last-name-input w-full'
                    id='last-name-field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <CreditCard size={16} className='mr-1 text-gray-500' />
                    NIC Number
                  </label>
                  <Input
                    name='nicNumber'
                    value={formData.nicNumber}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your NIC number'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.nicNumber}
                    errorMessage={errors.nicNumber}
                    className='nic-input w-full'
                    id='nic-field'
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
                    className='email-input w-full'
                    id='email-field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <Phone size={16} className='mr-1 text-gray-500' />
                    Phone Number
                  </label>
                  <Input
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your phone number'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    className='phone-input w-full'
                    id='phone-field'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center text-sm font-medium'>
                    <MapPin size={16} className='mr-1 text-gray-500' />
                    Address
                  </label>
                  <Input
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    variant='bordered'
                    placeholder='Enter your address'
                    disabled={!isEditing || loading}
                    isInvalid={!!errors.address}
                    errorMessage={errors.address}
                    className='add-input w-full'
                    id='add-field'
                  />
                </div>
              </form>
            </CardBody>

            {isEditing && (
              <>
                <Divider />
                <CardFooter className='flex justify-end gap-3 px-6 py-4'>
                  <Button
                    id='cancel-button'
                    className='form-button cancel'
                    variant='flat'
                    color='danger'
                    startContent={<X size={16} />}
                    onClick={handleCancelClick}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    id='update-button'
                    className='form-button update'
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
    </div>
  );
};

export default Profile;
