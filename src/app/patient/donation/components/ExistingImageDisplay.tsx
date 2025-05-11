'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ExistingImageDisplayProps {
  images: string[];
  title: string;
}

export default function ExistingImageDisplay({
  images,
  title,
}: ExistingImageDisplayProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className='mb-6'>
      <h3 className='mb-2 text-sm font-medium'>{title}</h3>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {images.map((imageUrl, index) => (
          <div key={index} className='group relative'>
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className='relative h-24 w-full cursor-pointer overflow-hidden rounded-md bg-gray-100 transition-opacity hover:opacity-90'
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <Image
                    src={imageUrl}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    sizes='(max-width: 768px) 100vw, 33vw'
                    className='object-cover'
                  />
                </div>
              </DialogTrigger>
              <DialogContent className='border-none bg-transparent p-0 sm:max-w-3xl'>
                <div className='relative mx-auto h-full max-h-[80vh] w-full'>
                  <Image
                    src={imageUrl}
                    alt={`Uploaded image ${index + 1}`}
                    width={1200}
                    height={800}
                    className='h-full w-full object-contain'
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      <p className='mt-2 text-xs text-gray-500'>
        These are your existing uploaded images. New uploads will be added to
        this collection.
      </p>
    </div>
  );
}
