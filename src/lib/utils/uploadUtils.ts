import { uploadImageToCloudinary } from '@/app/actions/uploadActions';
import { toast } from '@/hooks/use-toast';

/**
 * Uploads an array of image files to Cloudinary using a server action.
 *
 * @param files - An array of File objects to upload.
 * @param folder - The Cloudinary folder name to upload the images into.
 * @returns A promise that resolves to an array of successfully uploaded image URLs.
 * @throws If any upload fails.
 */
export async function uploadImages(
  files: File[],
  folder: string
): Promise<string[]> {
  if (!files || files.length === 0) {
    return []; // Return empty array if no files
  }

  // Ensure all items are File objects (optional, but good practice)
  const validFiles = files.filter((f) => f instanceof File);
  if (validFiles.length !== files.length) {
    console.warn('Some items provided to uploadImages were not File objects.');
  }
  if (validFiles.length === 0) {
    return [];
  }

  toast({
    title: 'Uploading images...',
    description: `Uploading ${validFiles.length} image(s). Please wait.`,
  });

  const uploadPromises = validFiles.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const result = await uploadImageToCloudinary(formData);

    if (!result.success || !result.url) {
      throw new Error(result.error || `Failed to upload ${file.name}`);
    }
    return result.url;
  });

  try {
    // Wait for all uploads to complete
    const uploadedUrls = await Promise.all(uploadPromises);
    toast({
      title: 'Image uploads complete!',
      description: `${uploadedUrls.length} image(s) uploaded successfully.`,
    });
    return uploadedUrls;
  } catch (error) {
    // Log the error and re-throw it so the calling function knows about the failure
    console.error('Error during image uploads:', error);
    toast({
      title: 'Image Upload Failed',
      description:
        error instanceof Error
          ? error.message
          : 'An unknown error occurred during upload.',
      variant: 'destructive',
    });
    throw error; // Re-throw the error to be caught in the onSubmit handler
  }
}
