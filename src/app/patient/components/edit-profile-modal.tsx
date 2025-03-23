'use client';

import type React from 'react';

import { useState } from 'react';
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

type ProfileData = {
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  permanentAddress: string;
  currentAddress: string;
  profileImageUrl: string;
  cancerType: string;
  cancerStage: string;
};

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (updatedData: ProfileData) => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profileData,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>(profileData);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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

              {/* Profile Image URL */}
              <div className='space-y-2'>
                <Label htmlFor='profileImageUrl'>Profile Image URL</Label>
                <Input
                  id='profileImageUrl'
                  name='profileImageUrl'
                  value={formData.profileImageUrl}
                  onChange={handleChange}
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
                    <SelectItem value='Male'>Male</SelectItem>
                    <SelectItem value='Female'>Female</SelectItem>
                    <SelectItem value='Other'>Other</SelectItem>
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

              {/* Cancer Type */}
              <div className='space-y-2'>
                <Label htmlFor='cancerType'>Cancer Type</Label>
                <Input
                  id='cancerType'
                  name='cancerType'
                  value={formData.cancerType}
                  onChange={handleChange}
                />
              </div>

              {/* Cancer Stage */}
              <div className='space-y-2'>
                <Label htmlFor='cancerStage'>Cancer Stage</Label>
                <Select
                  value={formData.cancerStage}
                  onValueChange={(value) =>
                    handleSelectChange('cancerStage', value)
                  }
                >
                  <SelectTrigger id='cancerStage'>
                    <SelectValue placeholder='Select stage' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Stage I'>Stage I</SelectItem>
                    <SelectItem value='Stage II'>Stage II</SelectItem>
                    <SelectItem value='Stage III'>Stage III</SelectItem>
                    <SelectItem value='Stage IV'>Stage IV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            <Button type='submit' className='bg-primary'>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
