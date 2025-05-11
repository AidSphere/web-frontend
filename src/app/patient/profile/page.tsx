'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  HomeIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { MedicalDocumentsModal } from '../components/medical-documents-model';
import { EditProfileModal } from '../components/edit-profile-modal';
import { useToast } from '@/hooks/use-toast';
import patientProfileService from '@/service/api/patient/patientProfileService';
import { PatientProfileDto } from '@/types/patient';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const { toast } = useToast();
  const params = useParams();
  const patientId = (params.id as string) || '4'; // Use 4 as default if no ID provided

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<PatientProfileDto | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMedicalDocumentsModalOpen, setIsMedicalDocumentsModalOpen] =
    useState(false);

  // Fetch patient profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, [patientId]);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const data = await patientProfileService.getPatientProfile(patientId);
      setProfileData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to load profile data. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to load profile data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedData: PatientProfileDto) => {
    try {
      const response = await patientProfileService.updatePatientProfile(
        patientId,
        updatedData
      );
      setProfileData(response);
      setIsEditModalOpen(false);
      toast({
        title: 'Success',
        description: 'Profile updated successfully.',
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle medical documents updates by refreshing profile data
  const handleMedicalDocumentsUpdate = () => {
    fetchProfileData();
  };

  if (loading) {
    return (
      <div className='container mx-auto flex items-center justify-center py-16'>
        <div className='text-center'>
          <div className='text-lg font-medium'>Loading profile data...</div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className='container mx-auto flex items-center justify-center py-16'>
        <div className='text-center'>
          <div className='text-destructive text-lg font-medium'>
            {error || 'Profile not found'}
          </div>
          <Button className='mt-4' onClick={fetchProfileData}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Extract cancer details from medical record if available
  const cancerType = profileData.medicalRecord?.cancerType || 'Not specified';
  const cancerStage = profileData.medicalRecord?.cancerStage || 'Not specified';

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Left column - Profile image and basic info */}
        <Card className='lg:col-span-1'>
          <CardContent className='flex flex-col items-center pt-6'>
            <Avatar className='mb-4 h-32 w-32'>
              <AvatarImage
                src={profileData.profileImageUrl || '/placeholder.svg'}
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
            <p className='text-muted-foreground mb-4'>
              Patient ID: {profileData.patientId}
            </p>

            <div className='mt-4 w-full'>
              <div className='mb-3 flex items-center gap-2'>
                <Mail className='text-muted-foreground h-5 w-5' />
                <span>{profileData.email}</span>
              </div>
              <div className='mb-3 flex items-center gap-2'>
                <Phone className='text-muted-foreground h-5 w-5' />
                <span>{profileData.phoneNumber}</span>
              </div>
              <div className='mb-3 flex items-center gap-2'>
                <User className='text-muted-foreground h-5 w-5' />
                <span>{profileData.gender}</span>
              </div>
              <div className='flex items-center gap-2'>
                <CalendarIcon className='text-muted-foreground h-5 w-5' />
                <span>Born: {profileData.dateOfBirth}</span>
              </div>
            </div>

            <Button
              className='mt-6 w-full'
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Right column - Detailed information */}
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Medical Information */}
            <div>
              <h3 className='mb-3 text-lg font-semibold'>
                Medical Information
              </h3>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-1'>
                  <p className='text-muted-foreground text-sm'>Cancer Type</p>
                  <p className='font-medium'>{cancerType}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-muted-foreground text-sm'>Cancer Stage</p>
                  <Badge variant='outline' className='font-medium'>
                    {cancerStage}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className='mb-3 text-lg font-semibold'>
                Address Information
              </h3>
              <div className='space-y-6 pb-16'>
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
              <div className='mt-6 border-t pt-4'>
                <Button
                  className='w-full'
                  onClick={() => setIsMedicalDocumentsModalOpen(true)}
                >
                  Manage Medical Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profileData={profileData}
          onSave={handleProfileUpdate}
        />
      )}

      {/* Medical Documents Modal */}
      {isMedicalDocumentsModalOpen && (
        <MedicalDocumentsModal
          isOpen={isMedicalDocumentsModalOpen}
          onClose={() => setIsMedicalDocumentsModalOpen(false)}
          patientId={profileData.patientId}
          onSaveComplete={handleMedicalDocumentsUpdate}
        />
      )}
    </div>
  );
}
