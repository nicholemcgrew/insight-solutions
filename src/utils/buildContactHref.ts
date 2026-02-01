export function buildContactHref(serviceTitle?: string) {
  const params = new URLSearchParams({ cta: "true" });

  if (serviceTitle) {
    params.set("service", encodeURIComponent(serviceTitle));
  }

  return `/?${params.toString()}#contact`;
}
