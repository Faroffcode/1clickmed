import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to convert Base64 to Blob
async function base64ToBlob(base64: string, type = 'application/octet-stream'): Promise<Blob> {
  const fetchRes = await fetch(base64);
  return fetchRes.blob();
}

// Helper function to upload image to Supabase Storage and get public URL
export async function uploadSupabaseImage(
  base64String: string | undefined,
  entityName: string,
  bucketName: string = 'entity_images'
): Promise<string | undefined> {
  if (!base64String || !base64String.startsWith('data:image')) {
    return base64String; // Return as is if not a new base64 image or already a URL
  }

  try {
    const MimeTypeMatch = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (!MimeTypeMatch || MimeTypeMatch.length < 2) {
        console.error('Invalid Base64 string, cannot determine MIME type.');
        return undefined;
    }
    const mimeType = MimeTypeMatch[1];
    const extension = mimeType.split('/')[1] || 'png'; // default to png if split fails

    const blob = await base64ToBlob(base64String, mimeType);
    const fileName = `${bucketName}/${entityName.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.${extension}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, blob, { contentType: mimeType, upsert: true });

    if (uploadError) {
      console.error('Error uploading image to Supabase Storage:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return publicUrlData.publicUrl;

  } catch (error) {
    console.error('Error in image processing/upload:', error);
    return undefined; // Or re-throw
  }
}

// Helper function to delete image from Supabase Storage
export async function deleteSupabaseImage(
  imageUrl: string | undefined,
  bucketName: string = 'entity_images'
): Promise<void> {
  if (!imageUrl || !imageUrl.includes(supabaseUrl)) { // Check if it's a Supabase storage URL
    return; // Not a Supabase storage URL or no URL
  }

  try {
    // Extract the file path from the public URL
    // Example URL: https://<project_ref>.supabase.co/storage/v1/object/public/bucket_name/file_path.png
    const urlParts = imageUrl.split(`/${bucketName}/`);
    if (urlParts.length < 2) {
      console.warn('Could not extract file path from Supabase image URL:', imageUrl);
      return;
    }
    const filePath = `${bucketName}/${urlParts[1]}`;
    
    const { error: deleteError } = await supabase.storage.from(bucketName).remove([filePath]);
    if (deleteError) {
      console.error('Error deleting image from Supabase Storage:', deleteError);
      // Don't throw, allow entity deletion to proceed
    }
  } catch (error) {
    console.error('Error in image deletion process:', error);
  }
}