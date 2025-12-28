// src/types/WebsiteConfig.ts

/**
 * Represents the color configuration for a generated website.
 */
export interface ColorScheme {
  primary: string
  secondary: string
  background: string
}

/**
 * Represents a single service offered by the business.
 */
export interface Service {
  title: string
  description: string
}

/**
 * Main data model for a generated website.
 * This is what the form edits and the preview renders.
 */
export interface WebsiteConfig {
  businessName: string
  tagline: string
  about: string
  contactEmail: string
  phone?: string
  heroImageUrl?: string
  colorScheme: ColorScheme
  services: Service[]
}
