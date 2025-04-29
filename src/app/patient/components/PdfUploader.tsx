'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, type Control } from 'react-hook-form';
import { XCircle, Upload, File, AlertCircle } from 'lucide-react';

type FileWithPreview = File & {
  preview: string;
  id: string;
};

interface PdfUploaderProps {
  name: string;
  control: Control<any>;
  label?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  required?: boolean;
}

export default function PdfUploader({
  name,
  control,
  label = 'Upload PDF files',
  maxFiles = 6,
  maxSize = 5 * 1024 * 1024, // 5MB default
  required = false,
}: PdfUploaderProps) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? 'This field is required' : false,
      validate: {
        fileType: (files: FileWithPreview[]) =>
          !files.length ||
          files.every((file) => file.type === 'application/pdf') ||
          'Only PDF files are allowed',
        fileSize: (files: FileWithPreview[]) =>
          !files.length ||
          files.every((file) => file.size <= maxSize) ||
          `Files must be smaller than ${maxSize / (1024 * 1024)}MB`,
        fileCount: (files: FileWithPreview[]) =>
          files.length <= maxFiles ||
          `You can only upload up to ${maxFiles} files`,
      },
    },
    defaultValue: [],
  });

  const [files, setFiles] = useState<FileWithPreview[]>(value || []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: crypto.randomUUID(),
        })
      ) as FileWithPreview[];

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
      accept: {
        'application/pdf': ['.pdf'],
      },
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
              ? 'Drop the PDF files here...'
              : files.length >= maxFiles
                ? `Maximum number of files reached (${maxFiles})`
                : 'Drag & drop PDF files here, or click to select files'}
          </p>
          <p className='mt-1 text-xs text-gray-500'>
            Only PDF files up to {maxSize / (1024 * 1024)}MB each
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
        <ul className='mt-4 space-y-2'>
          {files.map((file) => (
            <li
              key={file.id}
              className='flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3'
            >
              <div className='flex items-center'>
                <File className='mr-2 h-5 w-5 text-gray-500' />
                <div>
                  <p className='max-w-xs truncate text-sm font-medium text-gray-700'>
                    {file.name}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type='button'
                onClick={() => removeFile(file.id)}
                className='text-gray-500 transition-colors hover:text-red-500'
                aria-label={`Remove ${file.name}`}
              >
                <XCircle className='h-5 w-5' />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className='mt-1 text-xs text-gray-500'>
        {files.length} of {maxFiles} files selected
      </p>
    </div>
  );
}
