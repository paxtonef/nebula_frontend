import { get, post, del, uploadFile } from './api';

export interface MediaItem {
  id: string;
  businessId: string;
  title: string;
  description: string | null;
  url: string;
  type: 'image' | 'video';
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentItem {
  id: string;
  businessId: string;
  title: string;
  description: string | null;
  url: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface MediaResponse {
  status: string;
  data: MediaItem[];
}

export interface DocumentResponse {
  status: string;
  data: DocumentItem[];
}

/**
 * Get all media for a business
 */
export const getBusinessMedia = (businessId: string) => {
  return get<MediaResponse>(`/businesses/${businessId}/media`);
};

/**
 * Get all documents for a business
 */
export const getBusinessDocuments = (businessId: string) => {
  return get<DocumentResponse>(`/businesses/${businessId}/documents`);
};

/**
 * Upload media for a business
 */
export const uploadBusinessMedia = (businessId: string, file: File, metadata?: { title?: string; description?: string }) => {
  const formData = new FormData();
  formData.append('file', file);
  
  if (metadata?.title) {
    formData.append('title', metadata.title);
  }
  
  if (metadata?.description) {
    formData.append('description', metadata.description);
  }
  
  return uploadFile<{ status: string; data: MediaItem }>(`/businesses/${businessId}/media`, formData);
};

/**
 * Upload document for a business
 */
export const uploadBusinessDocument = (businessId: string, file: File, metadata?: { title?: string; description?: string }) => {
  const formData = new FormData();
  formData.append('file', file);
  
  if (metadata?.title) {
    formData.append('title', metadata.title);
  }
  
  if (metadata?.description) {
    formData.append('description', metadata.description);
  }
  
  return uploadFile<{ status: string; data: DocumentItem }>(`/businesses/${businessId}/documents`, formData);
};

/**
 * Delete media item
 */
export const deleteBusinessMedia = (businessId: string, mediaId: string) => {
  return del<{ status: string; message: string }>(`/businesses/${businessId}/media/${mediaId}`);
};

/**
 * Delete document item
 */
export const deleteBusinessDocument = (businessId: string, documentId: string) => {
  return del<{ status: string; message: string }>(`/businesses/${businessId}/documents/${documentId}`);
};

/**
 * Update media item metadata
 */
export const updateBusinessMedia = (businessId: string, mediaId: string, data: { title?: string; description?: string }) => {
  return post<{ status: string; data: MediaItem }>(`/businesses/${businessId}/media/${mediaId}`, data);
};

/**
 * Update document item metadata
 */
export const updateBusinessDocument = (businessId: string, documentId: string, data: { title?: string; description?: string }) => {
  return post<{ status: string; data: DocumentItem }>(`/businesses/${businessId}/documents/${documentId}`, data);
};
