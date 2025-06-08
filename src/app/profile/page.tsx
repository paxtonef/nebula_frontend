'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building, Phone, Globe, Mail, Camera, Upload, Loader2 } from 'lucide-react';
import ServicesProductsTab from '@/components/profile/ServicesProductsTab';
import MediaDocumentsTab from '@/components/profile/MediaDocumentsTab';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { Business } from '@/services/business.service';

export default function BusinessProfile() {
  const { user, error: authError, isLoading: authLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || 'basic');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Business | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    business, 
    isLoading: businessLoading, 
    error: businessError,
    updateProfile,
    uploadLogo,
    isUpdating,
    isUploading
  } = useBusinessProfile();

  // Set form data when business data is loaded
  useEffect(() => {
    if (business) {
      setFormData(business);
    }
  }, [business]);

  // Redirect if not authenticated
  if (authLoading || businessLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600 mr-2" />
      <span>Loading...</span>
    </div>;
  }

  if (authError || businessError) {
    return <div className="flex justify-center items-center h-screen">
      <p>Error: {(authError || businessError)?.message}</p>
      <Button onClick={() => router.push('/api/auth/login')} className="ml-4">Go to Login</Button>
    </div>;
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/api/auth/login');
    }
    return null;
  }
  
  // If business data is not loaded yet, show loading
  if (!business || !formData) {
    return <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600 mr-2" />
      <span>Loading business profile...</span>
    </div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: value
    } : null);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    } : null);
  };

  const handleSave = async () => {
    if (!formData) return;
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile changes. Please try again.');
    }
  };
  
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      await uploadLogo(e.target.files[0]);
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo. Please try again.');
    }
  };
  
  const handleAddService = async (service: string) => {
    if (!business) return;
    
    try {
      // In a real implementation, you would call an API to add the service
      // For now, we'll just update the local state
      const updatedServices = [...(business.services || []), service];
      await updateProfile({ services: updatedServices });
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service. Please try again.');
    }
  };
  
  const handleRemoveService = async (service: string) => {
    if (!business || !business.services) return;
    
    try {
      const updatedServices = business.services.filter(s => s !== service);
      await updateProfile({ services: updatedServices });
    } catch (error) {
      console.error('Error removing service:', error);
      alert('Failed to remove service. Please try again.');
    }
  };
  
  const handleAddCertification = async (certification: string) => {
    if (!business) return;
    
    try {
      const updatedCertifications = [...(business.certifications || []), certification];
      await updateProfile({ certifications: updatedCertifications });
    } catch (error) {
      console.error('Error adding certification:', error);
      alert('Failed to add certification. Please try again.');
    }
  };
  
  const handleRemoveCertification = async (certification: string) => {
    if (!business || !business.certifications) return;
    
    try {
      const updatedCertifications = business.certifications.filter(c => c !== certification);
      await updateProfile({ certifications: updatedCertifications });
    } catch (error) {
      console.error('Error removing certification:', error);
      alert('Failed to remove certification. Please try again.');
    }
  };
  
  // Media and document handling has been moved to the MediaDocumentsTab component
  // which uses the useBusinessMedia hook directly

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-64 w-full rounded-lg bg-gray-200 overflow-hidden">
            <img 
              src={businessData.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
          <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end">
            <div className="relative h-32 w-32 rounded-lg bg-white border-4 border-white shadow overflow-hidden">
              <img 
                src={business.logo || 'https://via.placeholder.com/150?text=Logo'} 
                alt={business.name} 
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <button 
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                    ) : (
                      <Upload className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </>
              )}
            </div>
            <div className="ml-4 mb-4">
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                {business.name}
              </h1>
              <p className="text-white drop-shadow-md flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {business.address?.city || business.city}, {business.address?.state || business.country}
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Business Details</TabsTrigger>
              <TabsTrigger value="services">Services & Products</TabsTrigger>
              <TabsTrigger value="media">Media & Documents</TabsTrigger>
            </TabsList>
            
            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Manage your business's basic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Business Name</Label>
                      {isEditing ? (
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <p className="text-gray-700">{businessData.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      {isEditing ? (
                        <Select 
                          value={formData.industry} 
                          onValueChange={(value) => setFormData({...formData, industry: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-gray-700">{businessData.industry}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Company Size</Label>
                      {isEditing ? (
                        <Select 
                          value={formData.size} 
                          onValueChange={(value) => setFormData({...formData, size: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="50-100">50-100 employees</SelectItem>
                            <SelectItem value="101-500">101-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-gray-700">{businessData.size} employees</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founded">Founded</Label>
                      {isEditing ? (
                        <Input 
                          id="founded" 
                          name="founded" 
                          value={formData.founded} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <p className="text-gray-700">{businessData.founded}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    {isEditing ? (
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-700">{businessData.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Business Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Location</CardTitle>
                  <CardDescription>
                    Manage your business's contact information and location
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" /> Website
                      </Label>
                      {isEditing ? (
                        <Input 
                          id="website" 
                          name="website" 
                          value={formData.website} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <p className="text-gray-700">
                          <a href={businessData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                            {businessData.website}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" /> Email
                      </Label>
                      {isEditing ? (
                        <Input 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <p className="text-gray-700">
                          <a href={`mailto:${businessData.email}`} className="text-primary-600 hover:underline">
                            {businessData.email}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" /> Phone
                      </Label>
                      {isEditing ? (
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                        />
                      ) : (
                        <p className="text-gray-700">{businessData.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2" /> Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        {isEditing ? (
                          <Input 
                            id="street" 
                            name="street" 
                            value={formData.address.street} 
                            onChange={handleAddressChange} 
                          />
                        ) : (
                          <p className="text-gray-700">{businessData.address.street}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        {isEditing ? (
                          <Input 
                            id="city" 
                            name="city" 
                            value={formData.address.city} 
                            onChange={handleAddressChange} 
                          />
                        ) : (
                          <p className="text-gray-700">{businessData.address.city}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        {isEditing ? (
                          <Input 
                            id="state" 
                            name="state" 
                            value={formData.address.state} 
                            onChange={handleAddressChange} 
                          />
                        ) : (
                          <p className="text-gray-700">{businessData.address.state}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP/Postal Code</Label>
                        {isEditing ? (
                          <Input 
                            id="zip" 
                            name="zip" 
                            value={formData.address.zip} 
                            onChange={handleAddressChange} 
                          />
                        ) : (
                          <p className="text-gray-700">{businessData.address.zip}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        {isEditing ? (
                          <Input 
                            id="country" 
                            name="country" 
                            value={formData.address.country} 
                            onChange={handleAddressChange} 
                          />
                        ) : (
                          <p className="text-gray-700">{businessData.address.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Services Tab */}
            <TabsContent value="services">
              <ServicesProductsTab
                business={business}
                isEditing={isEditing}
                onAddService={handleAddService}
                onRemoveService={handleRemoveService}
                onAddCertification={handleAddCertification}
                onRemoveCertification={handleRemoveCertification}
              />
            </TabsContent>
            
            {/* Media Tab */}
            <TabsContent value="media">
              <MediaDocumentsTab
                business={business}
                isEditing={isEditing}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
