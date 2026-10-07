/** Keep accidental development/preview environment values out of public search signals. */
export function canonicalOrigin(configured: string | undefined, fallback: string): string {
  const primary = new URL(fallback);
  if (!configured?.trim()) return primary.origin;
  const candidate = new URL(configured);
  if (!['http:', 'https:'].includes(candidate.protocol) || candidate.username || candidate.password) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a public HTTP(S) origin without credentials.");
  }
  const host = candidate.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') ||
      host === '[::1]' || /^127\./.test(host) || host === '0.0.0.0' ||
      host === 'vercel.app' || host.endsWith('.vercel.app')) return primary.origin;
  if (host === primary.hostname.replace(/^www\./, '') || host === primary.hostname) return primary.origin;
  if (candidate.protocol !== 'https:') throw new Error("A custom canonical origin must use HTTPS.");
  return candidate.origin;
}
