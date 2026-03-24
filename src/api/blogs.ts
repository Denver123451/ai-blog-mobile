import { STRAPI_BASE_URL } from "@/src/constants/api";
import type { Blog, BlogsListResponse } from "@/src/types/blog";

export async function fetchBlogs(): Promise<Blog[]> {
  const url = `${STRAPI_BASE_URL}/api/blogs`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load list: HTTP ${res.status}`);
  }
  const json = (await res.json()) as BlogsListResponse;
  return json.data ?? [];
}

export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  const q = `filters[slug][$eq]=${encodeURIComponent(slug)}`;
  const url = `${STRAPI_BASE_URL}/api/blogs?${q}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load article: HTTP ${res.status}`);
  }
  const json = (await res.json()) as BlogsListResponse;
  return json.data?.[0] ?? null;
}
