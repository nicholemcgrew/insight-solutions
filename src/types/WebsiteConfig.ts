// src/types/WebsiteConfig.ts
export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface WebsiteConfig {
  businessName: string;
  tagline: string;
  about: string;
  contactEmail: string;
  phone?: string;
  address?: string;
  heroImage?: string;
  colorScheme: ColorScheme;
  services: Service[];
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}