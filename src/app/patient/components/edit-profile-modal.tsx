'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/lib/utils/uploadUtils';
import { PatientProfileDto } from '@/types/patient';
import Image from 'next/image';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: PatientProfileDto;
  onSave: (updatedData: PatientProfileDto) => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profileData,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<PatientProfileDto>(profileData);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    profileData.profileImageUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file',
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Profile image must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }
      setProfileImage(file);
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsUploading(true);
      // If a new profile image was selected, upload it
      if (profileImage) {
        const imageUrl = await uploadImage(profileImage, 'profile-images');
        // Update the form data with the new image URL
        setFormData((prev) => ({
          ...prev,
          profileImageUrl: imageUrl,
        }));
        // Call onSave with updated data including new image URL
        onSave({
          ...formData,
          profileImageUrl: imageUrl,
        });
      } else {
        // No new image, just save the existing form data
        onSave(formData);
      }

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile information here.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            {/* Profile Image Section */}
            <div className='flex flex-col items-center space-y-4'>
              {imagePreview && (
                <div className='relative h-24 w-24 overflow-hidden rounded-full'>
                  <Image
                    src={imagePreview}
                    alt='Profile'
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}

              <div className='space-y-2'>
                <Label htmlFor='profileImage'>Profile Picture</Label>
                <Input
                  id='profileImage'
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <p className='text-muted-foreground text-xs'>
                  Upload a profile picture (JPEG, PNG, WebP). Max 5MB.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* Patient ID (read-only) */}
              <div className='space-y-2'>
                <Label htmlFor='patientId'>Patient ID</Label>
                <Input
                  id='patientId'
                  name='patientId'
                  value={formData.patientId}
                  disabled
                  className='bg-muted'
                />
              </div>

              {/* First Name */}
              <div className='space-y-2'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              {/* Last Name */}
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              {/* Date of Birth */}
              <div className='space-y-2'>
                <Label htmlFor='dateOfBirth'>Date of Birth</Label>
                <Input
                  id='dateOfBirth'
                  name='dateOfBirth'
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              {/* Gender */}
              <div className='space-y-2'>
                <Label htmlFor='gender'>Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger id='gender'>
                    <SelectValue placeholder='Select gender' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='MALE'>Male</SelectItem>
                    <SelectItem value='FEMALE'>Female</SelectItem>
                    <SelectItem value='OTHER'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Phone Number */}
              <div className='space-y-2'>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Cancer Type from medical record if available */}
              {formData.medicalRecord && (
                <>
                  <div className='space-y-2'>
                    <Label htmlFor='cancerType'>Cancer Type</Label>
                    <Input
                      id='cancerType'
                      name='cancerType'
                      value={
                        formData.medicalRecord?.cancerType || 'Lung Cancer'
                      }
                      disabled
                      className='bg-muted'
                    />
                  </div>

                  {/* Cancer Stage from medical record if available */}
                  <div className='space-y-2'>
                    <Label htmlFor='cancerStage'>Cancer Stage</Label>
                    <Input
                      id='cancerStage'
                      name='cancerStage'
                      value={formData.medicalRecord?.cancerStage || 'Stage 2'}
                      disabled
                      className='bg-muted'
                    />
                  </div>
                </>
              )}
            </div>

            {/* Permanent Address */}
            <div className='space-y-2'>
              <Label htmlFor='permanentAddress'>Permanent Address</Label>
              <Textarea
                id='permanentAddress'
                name='permanentAddress'
                value={formData.permanentAddress}
                onChange={handleChange}
                rows={2}
              />
            </div>

            {/* Current Address */}
            <div className='space-y-2'>
              <Label htmlFor='currentAddress'>Current Address</Label>
              <Textarea
                id='currentAddress'
                name='currentAddress'
                value={formData.currentAddress}
                onChange={handleChange}
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' className='bg-primary' disabled={isUploading}>
              {isUploading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
