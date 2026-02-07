const canonicalizeValue = (v: string) =>
  v.toLowerCase().trim().replace(/_/g, "-").replace(/\s+/g, "-");

export function buildContactHref(serviceTitleOrValue?: string) {
  const base = "/"; 
  const hash = "#contact";

  if (!serviceTitleOrValue) return `${base}${hash}`;

  const service = encodeURIComponent(canonicalizeValue(serviceTitleOrValue));
  return `${base}?service=${service}${hash}`;
}
