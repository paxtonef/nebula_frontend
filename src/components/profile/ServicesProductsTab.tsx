'use client';

import { useState } from 'react';
import { PlusCircle, X, Award, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Business } from '@/services/business.service';

interface ServicesProductsTabProps {
  business: Business;
  isEditing: boolean;
  onAddService: (service: string) => void;
  onRemoveService: (service: string) => void;
  onAddCertification: (certification: string) => void;
  onRemoveCertification: (certification: string) => void;
}

export default function ServicesProductsTab({
  business,
  isEditing,
  onAddService,
  onRemoveService,
  onAddCertification,
  onRemoveCertification
}: ServicesProductsTabProps) {
  const [newService, setNewService] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const handleAddService = () => {
    if (newService.trim()) {
      onAddService(newService.trim());
      setNewService('');
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      onAddCertification(newCertification.trim());
      setNewCertification('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Services Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Services & Products
          </CardTitle>
          <CardDescription>
            List the services and products your business offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing && (
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Add a service or product..."
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
              />
              <Button onClick={handleAddService}>Add</Button>
            </div>
          )}

          {business.services && business.services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {business.services.map((service, index) => (
                <div
                  key={`service-${index}`}
                  className="bg-gray-100 rounded-full px-3 py-1 flex items-center"
                >
                  <span>{service}</span>
                  {isEditing && (
                    <button
                      onClick={() => onRemoveService(service)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              {isEditing
                ? "Add your services and products to help others understand what your business offers."
                : "No services or products listed yet."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Certifications & Achievements
          </CardTitle>
          <CardDescription>
            Showcase your business certifications and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing && (
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="Add a certification or achievement..."
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCertification()}
              />
              <Button onClick={handleAddCertification}>Add</Button>
            </div>
          )}

          {business.certifications && business.certifications.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {business.certifications.map((certification, index) => (
                <div
                  key={`certification-${index}`}
                  className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 flex items-center"
                >
                  <Award className="h-4 w-4 mr-1" />
                  <span>{certification}</span>
                  {isEditing && (
                    <button
                      onClick={() => onRemoveCertification(certification)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              {isEditing
                ? "Add certifications to increase your business credibility."
                : "No certifications listed yet."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
