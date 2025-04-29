'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, type Control } from 'react-hook-form';
import { XCircle, Upload, AlertCircle } from 'lucide-react';

type ImageWithPreview = File & {
  preview: string;
  id: string;
};

interface ImageUploaderProps {
  name: string;
  control: Control<any>;
  label?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  required?: boolean;
  acceptedFormats?: string[]; // Array of accepted image formats
}

export default function ImageUploader({
  name,
  control,
  label = 'Upload Images',
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  required = false,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
}: ImageUploaderProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? 'This field is required' : false,
      validate: {
        fileType: (files: ImageWithPreview[]) =>
          !files.length ||
          files.every((file) => acceptedFormats.includes(file.type)) ||
          `Only ${acceptedFormats.map((format) => format.split('/')[1].toUpperCase()).join(', ')} images are allowed`,
        fileSize: (files: ImageWithPreview[]) =>
          !files.length ||
          files.every((file) => file.size <= maxSize) ||
          `Images must be smaller than ${maxSize / (1024 * 1024)}MB`,
        fileCount: (files: ImageWithPreview[]) =>
          files.length <= maxFiles ||
          `You can only upload up to ${maxFiles} images`,
      },
    },
    defaultValue: [],
  });

  const [files, setFiles] = useState<ImageWithPreview[]>(value || []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: crypto.randomUUID(),
        })
      ) as ImageWithPreview[];

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      onChange(updatedFiles);
    },
    [files, maxFiles, onChange]
  );

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptedFormats.reduce(
        (acc, format) => {
          acc[format] = [];
          return acc;
        },
        {} as Record<string, string[]>
      ),
      maxSize,
      maxFiles: maxFiles - files.length,
      disabled: files.length >= maxFiles,
    });

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors duration-200 ease-in-out ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'} ${isDragReject ? 'border-red-500 bg-red-50' : ''} ${error ? 'border-red-500' : ''} ${files.length >= maxFiles ? 'cursor-not-allowed opacity-60' : ''} `}
      >
        <input {...getInputProps()} />

        <div className='flex flex-col items-center justify-center text-center'>
          <Upload className='mb-2 h-10 w-10 text-gray-400' />
          <p className='text-sm text-gray-600'>
            {isDragActive
              ? 'Drop the images here...'
              : files.length >= maxFiles
                ? `Maximum number of images reached (${maxFiles})`
                : 'Drag & drop images here, or click to select files'}
          </p>
          <p className='mt-1 text-xs text-gray-500'>
            Accepted formats:{' '}
            {acceptedFormats
              .map((format) => format.split('/')[1].toUpperCase())
              .join(', ')}
          </p>
          <p className='text-xs text-gray-500'>
            Max size: {maxSize / (1024 * 1024)}MB
          </p>
        </div>
      </div>

      {error && (
        <div className='mt-1 flex items-center text-sm text-red-500'>
          <AlertCircle className='mr-1 h-4 w-4' />
          <span>{error.message}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
          {files.map((file) => (
            <div key={file.id} className='group relative'>
              <div className='aspect-square w-full overflow-hidden rounded-md bg-gray-100'>
                <img
                  src={file.preview || '/placeholder.svg'}
                  alt={file.name}
                  className='h-full w-full object-cover'
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </div>

              <button
                type='button'
                onClick={() => removeFile(file.id)}
                className='absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-red-500'
                aria-label={`Remove ${file.name}`}
              >
                <XCircle className='h-5 w-5' />
              </button>

              <div className='mt-1 truncate px-1 text-xs text-gray-500'>
                {file.name}
              </div>
              <div className='px-1 text-xs text-gray-400'>
                {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>
          ))}
        </div>
      )}

      <p className='mt-1 text-xs text-gray-500'>
        {files.length} of {maxFiles} images selected
      </p>
    </div>
  );
}
