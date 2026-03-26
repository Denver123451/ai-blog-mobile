import { STRAPI_BASE_URL } from "@/src/constants/api";
export function getImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_BASE_URL}${url}`;
}
