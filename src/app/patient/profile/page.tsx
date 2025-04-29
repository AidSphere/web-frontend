'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { EditProfileModal } from '@/app/patient/components/edit-profile-modal';
import {
  CalendarIcon,
  HomeIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { Divider } from '@heroui/react';

// Mock data
const initialProfileData = {
  patientId: '550e8400-e29b-41d4-a716',
  firstName: 'Ushan',
  lastName: '',
  dateOfBirth: '15-08-1985',
  gender: 'Male',
  phoneNumber: '+1234567890',
  email: 'u@example.com',
  permanentAddress: '123 Main Street, Springfield, IL, USA',
  currentAddress: '456 Elm Street, Chicago, IL, USA',
  profileImageUrl:
    'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
  cancerType: 'Lung Cancer',
  cancerStage: 'Stage III',
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileUpdate = (updatedData: typeof initialProfileData) => {
    setProfileData(updatedData);
    setIsModalOpen(false);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Left column - Profile image and basic info */}
        <Card className='lg:col-span-1'>
          <CardContent className='flex flex-col items-center pt-6'>
            <Avatar className='mb-4 h-32 w-32'>
              <AvatarImage
                src={profileData.profileImageUrl}
                alt={`${profileData.firstName} ${profileData.lastName}`}
              />
              <AvatarFallback className='text-3xl'>
                {profileData.firstName.charAt(0)}
                {profileData.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h2 className='mb-1 text-2xl font-bold'>
              {profileData.firstName} {profileData.lastName}
            </h2>
            <Divider className='mb-2' />
            <p className='mb-4 text-foreground'>
              Patient ID: {profileData.patientId}
            </p>

            <div className='mt-4 w-full'>
              <div className='mb-3 flex items-center gap-4'>
                <Mail className='h-5 w-5 text-primary' />
                <span>{profileData.email}</span>
              </div>
              <div className='mb-3 flex items-center gap-4'>
                <Phone className='h-5 w-5 text-primary' />
                <span>{profileData.phoneNumber}</span>
              </div>
              <div className='mb-3 flex items-center gap-4'>
                <User className='h-5 w-5 text-primary' />
                <span>{profileData.gender}</span>
              </div>
              <div className='flex items-center gap-4'>
                <CalendarIcon className='h-5 w-5 text-primary' />
                <span>Born: {profileData.dateOfBirth}</span>
              </div>
            </div>

            <Button
              className='mt-6 w-full bg-primary'
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Right column - Detailed information */}
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle className='-mb-4 text-2xl text-slate-700'>
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Divider />
            {/* Medical Information */}
            <div>
              <h3 className='mb-3 text-lg font-semibold'>
                Medical Information
              </h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-1'>
                  <p className='text-muted-foreground text-sm'>Cancer Type</p>
                  <p className='font-medium'>{profileData.cancerType}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-muted-foreground text-sm'>Cancer Stage</p>
                  <Badge variant='outline' className='font-medium'>
                    {profileData.cancerStage}
                  </Badge>
                </div>
              </div>
            </div>
            <Divider />

            {/* Address Information */}
            <div>
              <h3 className='mb-3 text-lg font-semibold'>
                Address Information
              </h3>
              <div className='space-y-4'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <HomeIcon className='text-muted-foreground h-4 w-4' />
                    <p className='text-muted-foreground text-sm'>
                      Permanent Address
                    </p>
                  </div>
                  <p className='font-medium'>{profileData.permanentAddress}</p>
                </div>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='text-muted-foreground h-4 w-4' />
                    <p className='text-muted-foreground text-sm'>
                      Current Address
                    </p>
                  </div>
                  <p className='font-medium'>{profileData.currentAddress}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileData={profileData}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}
