'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface BusinessCardProps {
  id: string;
  name: string;
  description: string;
  industry: string;
  logo: string | null;
  trustScore: number;
}

export default function BusinessCard({ id, name, description, industry, logo, trustScore }: BusinessCardProps) {
  const defaultLogo = '/images/default-business-logo.png';
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-40 bg-gray-100">
        {logo ? (
          <Image 
            src={logo} 
            alt={`${name} logo`}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image 
              src={defaultLogo} 
              alt="Default business logo"
              width={80}
              height={80}
              className="opacity-50"
            />
          </div>
        )}
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{industry}</p>
        <p className="text-sm line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm font-medium">Trust Score: {trustScore}/10</span>
        </div>
        <Link href={`/businesses/${id}`}>
          <span className="text-sm text-blue-600 hover:text-blue-800">View Profile</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
