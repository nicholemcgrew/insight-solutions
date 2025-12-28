export function buildContactHref(serviceTitle?: string) {
  // Keep CTA URL rules centralized so every CTA stays consistent.
  const params = new URLSearchParams({ cta: "true" });
  if (serviceTitle) params.set("service", serviceTitle);
  return `/?${params.toString()}#contact`;
}

export {};
