'use client';
import { useState, useEffect } from 'react';
import { Button, Input } from '@heroui/react';
import { Image } from '@heroui/react';
import { z } from 'zod';
import ChangePasswordModal from '../home/[donationId]/_components/changePassword';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  nicNumber: z.string().min(1, 'NIC Number is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone Number must be at least 10 characters'),
  somethingNeeded: z.string().optional(),
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nicNumber: '',
    email: '',
    phoneNumber: '',
    somethingNeeded: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Function to fetch profile data from the backend
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        nicNumber: data.nicNumber || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        somethingNeeded: data.somethingNeeded || '',
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
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = () => {
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
      // Handle successful form submission here
      console.log('Form data:', result.data);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      </div>
      {loading ? (
        <p className='text-center'>Loading...</p>
      ) : (
        <div className='ml-32 mr-32 grid grid-rows-2 gap-10'>
          {/* Header area */}
          <div className='flex w-full flex-row justify-between gap-10'>
            <div className='flex flex-row justify-end'>
              <Image
                alt='HeroUI hero Image'
                src='https://heroui.com/images/hero-card-complete.jpeg'
                width={200}
                height={200}
                className='rounded-full'
              />
            </div>
            <div className='flex flex-row items-center justify-center gap-4'>
              {!isEditing && (
                <Button onClick={handleEditClick}>Edit Profile</Button>
              )}
              <Button>Download Data</Button>
              <Button>
                <ChangePasswordModal>Change Password</ChangePasswordModal>
              </Button>
            </div>
          </div>

          <form className='grid grid-cols-2 gap-10'>
            <div>
              <Input
                placeholder='First Name'
                type='text'
                name='firstName'
                variant='bordered'
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.firstName && (
                <p className='text-red-500'>{errors.firstName}</p>
              )}
            </div>
            <div>
              <Input
                placeholder='Last Name'
                type='text'
                name='lastName'
                variant='bordered'
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.lastName && (
                <p className='text-red-500'>{errors.lastName}</p>
              )}
            </div>
            <div>
              <Input
                placeholder='NIC Number'
                type='text'
                name='nicNumber'
                value={formData.nicNumber}
                variant='bordered'
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.nicNumber && (
                <p className='text-red-500'>{errors.nicNumber}</p>
              )}
            </div>
            <div>
              <Input
                placeholder='Email'
                type='text'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                variant='bordered'
                disabled={!isEditing}
              />
              {errors.email && <p className='text-red-500'>{errors.email}</p>}
            </div>
            <div>
              <Input
                placeholder='Phone Number'
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                variant='bordered'
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.phoneNumber && (
                <p className='text-red-500'>{errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <Input
                placeholder='Address'
                type='text'
                name='somethingNeeded'
                value={formData.somethingNeeded}
                variant='bordered'
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.somethingNeeded && (
                <p className='text-red-500'>{errors.somethingNeeded}</p>
              )}
            </div>
          </form>
        </div>
      )}
      {/* Update and Cancel buttons, shown only in edit mode */}
      {isEditing && (
        <div className='m-5 flex flex-row justify-center gap-10'>
          <Button
            variant='shadow'
            color='secondary'
            onClick={handleUpdateClick}
          >
            Update Profile
          </Button>
          <Button variant='shadow' onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
