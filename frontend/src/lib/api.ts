/**
 * SSOT for Backend API Base URL
 * Default to the live Cloudflare Worker deployment
 */
export const API_BASE = 
  process.env.NEXT_PUBLIC_API_URL || 
  'https://tugasmu-api.johananggo.workers.dev';

export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
}
