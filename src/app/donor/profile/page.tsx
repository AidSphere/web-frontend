'use client';
import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { Image } from '@heroui/react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div>
        <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      </div>
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
            <Button>Change Password</Button>
          </div>
        </div>

        <form className='grid grid-cols-2 gap-10'>
          <Input placeholder='First Name' type='text' disabled={!isEditing} />
          <Input placeholder='Last Name' type='text' disabled={!isEditing} />
          <Input placeholder='NIC Number' type='text' disabled={!isEditing} />
          <Input placeholder='Email' type='text' disabled={!isEditing} />
          <Input placeholder='Phone Number' type='text' disabled={!isEditing} />
          <Input
            placeholder='Something needed'
            type='text'
            disabled={!isEditing}
          />
        </form>
      </div>
      {/* Update and Cancel buttons, shown only in edit mode */}
      {isEditing && (
        <div className='m-5 flex flex-row justify-center gap-10'>
          <Button variant='shadow' color='secondary'>
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
