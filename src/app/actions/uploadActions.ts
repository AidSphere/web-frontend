'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensure HTTPS URLs are returned
});

// Function to upload a single image file
export async function uploadImageToCloudinary(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('file') as File | null;
  const folder = formData.get('folder') as string | null;

  if (!file) {
    return { success: false, error: 'No file provided.' };
  }

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    // Use upload_stream to upload the buffer
    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              // Optional: Add upload presets, tags, folders, etc.
              folder: folder || 'default_folder',
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary Upload Error:', error);
                reject(error);
              } else if (result) {
                resolve(result);
              } else {
                reject(
                  new Error('Cloudinary upload failed without error object.')
                );
              }
            }
          )
          .end(buffer);
      }
    );

    console.log('Cloudinary Upload Success:', uploadResult.secure_url);
    // Optionally revalidate paths if needed after upload
    // revalidatePath('/some-path');
    return { success: true, url: uploadResult.secure_url };
  } catch (error: any) {
    console.error('Failed to upload image to Cloudinary:', error);
    return { success: false, error: error.message || 'Upload failed.' };
  }
}
