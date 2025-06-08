import { useState, useEffect } from 'react';
import { 
  MediaItem, 
  DocumentItem, 
  getBusinessMedia, 
  getBusinessDocuments, 
  uploadBusinessMedia, 
  uploadBusinessDocument,
  deleteBusinessMedia,
  deleteBusinessDocument
} from '@/services/media.service';

interface UseBusinessMediaReturn {
  media: MediaItem[];
  documents: DocumentItem[];
  isLoading: boolean;
  error: Error | null;
  uploadMedia: (file: File, metadata?: { title?: string; description?: string }) => Promise<MediaItem>;
  uploadDocument: (file: File, metadata?: { title?: string; description?: string }) => Promise<DocumentItem>;
  deleteMedia: (mediaId: string) => Promise<void>;
  deleteDocument: (documentId: string) => Promise<void>;
  isUploading: boolean;
}

export function useBusinessMedia(businessId: string): UseBusinessMediaReturn {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Fetch media and documents when businessId changes
  useEffect(() => {
    if (!businessId) {
      setIsLoading(false);
      return;
    }

    async function fetchMediaAndDocuments() {
      try {
        setIsLoading(true);
        const [mediaResponse, documentsResponse] = await Promise.all([
          getBusinessMedia(businessId),
          getBusinessDocuments(businessId)
        ]);
        
        setMedia(mediaResponse.data);
        setDocuments(documentsResponse.data);
      } catch (err) {
        console.error('Error fetching business media and documents:', err);
        setError(err instanceof Error ? err : new Error('Failed to load media and documents'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchMediaAndDocuments();
  }, [businessId]);

  // Upload media
  const uploadMedia = async (
    file: File, 
    metadata?: { title?: string; description?: string }
  ): Promise<MediaItem> => {
    if (!businessId) {
      throw new Error('No business ID provided');
    }

    try {
      setIsUploading(true);
      const response = await uploadBusinessMedia(businessId, file, metadata);
      
      // Update the media state with the new item
      setMedia(prev => [...prev, response.data]);
      
      return response.data;
    } catch (err) {
      console.error('Error uploading media:', err);
      throw err instanceof Error ? err : new Error('Failed to upload media');
    } finally {
      setIsUploading(false);
    }
  };

  // Upload document
  const uploadDocument = async (
    file: File, 
    metadata?: { title?: string; description?: string }
  ): Promise<DocumentItem> => {
    if (!businessId) {
      throw new Error('No business ID provided');
    }

    try {
      setIsUploading(true);
      const response = await uploadBusinessDocument(businessId, file, metadata);
      
      // Update the documents state with the new item
      setDocuments(prev => [...prev, response.data]);
      
      return response.data;
    } catch (err) {
      console.error('Error uploading document:', err);
      throw err instanceof Error ? err : new Error('Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete media
  const deleteMedia = async (mediaId: string): Promise<void> => {
    if (!businessId) {
      throw new Error('No business ID provided');
    }

    try {
      await deleteBusinessMedia(businessId, mediaId);
      
      // Remove the deleted item from state
      setMedia(prev => prev.filter(item => item.id !== mediaId));
    } catch (err) {
      console.error('Error deleting media:', err);
      throw err instanceof Error ? err : new Error('Failed to delete media');
    }
  };

  // Delete document
  const deleteDocument = async (documentId: string): Promise<void> => {
    if (!businessId) {
      throw new Error('No business ID provided');
    }

    try {
      await deleteBusinessDocument(businessId, documentId);
      
      // Remove the deleted item from state
      setDocuments(prev => prev.filter(item => item.id !== documentId));
    } catch (err) {
      console.error('Error deleting document:', err);
      throw err instanceof Error ? err : new Error('Failed to delete document');
    }
  };

  return {
    media,
    documents,
    isLoading,
    error,
    uploadMedia,
    uploadDocument,
    deleteMedia,
    deleteDocument,
    isUploading
  };
}
