'use client';

import { useState, useRef } from 'react';
import { Upload, Image, FileText, X, Plus, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@/components/ui';
import { Business } from '@/services/business.service';

interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: string;
}

interface DocumentItem {
  id: string;
  title: string;
  url: string;
  fileType: string;
  fileSize: number;
}

interface MediaDocumentsTabProps {
  business: Business;
  isEditing: boolean;
}

export default function MediaDocumentsTab({ business, isEditing }: MediaDocumentsTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    // Mock upload functionality
    setTimeout(() => {
      const file = e.target.files?.[0];
      if (file) {
        const newMedia: MediaItem = {
          id: `media-${Date.now()}`,
          title: file.name.split('.')[0],
          url: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? 'image' : 'video'
        };
        setMedia([...media, newMedia]);
      }
      setIsUploading(false);
    }, 1000);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    // Mock upload functionality
    setTimeout(() => {
      const file = e.target.files?.[0];
      if (file) {
        const newDocument: DocumentItem = {
          id: `doc-${Date.now()}`,
          title: file.name.split('.')[0],
          url: URL.createObjectURL(file),
          fileType: file.name.split('.').pop() || 'unknown',
          fileSize: file.size
        };
        setDocuments([...documents, newDocument]);
      }
      setIsUploading(false);
    }, 1000);
  };

  const handleDeleteMedia = (itemId: string) => {
    setMedia(media.filter(item => item.id !== itemId));
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-8">
      {/* Media Gallery Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Image className="h-5 w-5 mr-2" />
            Media Gallery
          </CardTitle>
          <CardDescription>
            Upload photos and videos of your business, products, and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing && (
            <div className="mb-4">
              <input
                type="file"
                ref={mediaInputRef}
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload">
                <Button
                  type="button"
                  className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  onClick={() => mediaInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Media'}
                </Button>
              </label>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {media.map((item: MediaItem) => (
                <div key={item.id} className="relative group">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    {isEditing && (
                      <Button
                        className="bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteMedia(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium">{item.title}</p>
                </div>
              ))}
              
              {isEditing && (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-md h-48 flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
                  onClick={() => mediaInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Plus className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Add media</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {media.length === 0 && !isEditing && (
            <div className="text-gray-500 italic text-center py-8">
              No media uploaded yet.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Documents
          </CardTitle>
          <CardDescription>
            Share brochures, catalogs, and other business documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing && (
            <div className="mb-4">
              <input
                type="file"
                ref={documentInputRef}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={handleDocumentUpload}
                className="hidden"
                id="document-upload"
              />
              <label htmlFor="document-upload">
                <Button
                  type="button"
                  className="flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  onClick={() => documentInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </label>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc: DocumentItem) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-xs text-gray-500">
                        {doc.fileType} • {formatFileSize(doc.fileSize)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      className="text-blue-600 bg-transparent hover:bg-blue-50 p-1 text-sm"
                      onClick={() => window.open(doc.url, '_blank')}
                    >
                      View
                    </Button>
                    {isEditing && (
                      <Button
                        className="text-red-600 bg-transparent hover:bg-red-50 p-1 text-sm"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {documents.length === 0 && !isEditing && (
            <div className="text-gray-500 italic text-center py-8">
              No documents uploaded yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
