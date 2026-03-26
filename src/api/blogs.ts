import { STRAPI_BASE_URL } from "@/src/constants/api";
import type { Blog, BlogImage, BlogsListResponse } from "@/src/types/blog";

/** Strapi: image.data.attributes.url */
function mapBlogImage(raw: unknown): BlogImage | null {
  if (raw == null || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.url === "string") {
    return {
      url: o.url,
      alternativeText:
        typeof o.alternativeText === "string" ? o.alternativeText : null,
    };
  }
  const data = o.data;
  if (data == null || typeof data !== "object") return null;
  const attrs = (data as Record<string, unknown>).attributes;
  if (attrs == null || typeof attrs !== "object") return null;
  const a = attrs as Record<string, unknown>;
  if (typeof a.url !== "string") return null;
  return {
    url: a.url,
    alternativeText:
      typeof a.alternativeText === "string" ? a.alternativeText : null,
  };
}

function mapBlog(raw: unknown): Blog {
  const o = raw as Record<string, unknown>;
  return {
    id: Number(o.id),
    documentId: typeof o.documentId === "string" ? o.documentId : undefined,
    name: String(o.name ?? ""),
    slug: String(o.slug ?? ""),
    description: String(o.description ?? ""),
    content: String(o.content ?? ""),
    image: mapBlogImage(o.image),
    seoTitle: typeof o.seoTitle === "string" ? o.seoTitle : undefined,
    seoDescription:
      typeof o.seoDescription === "string" ? o.seoDescription : undefined,
    createdAt: typeof o.createdAt === "string" ? o.createdAt : undefined,
    updatedAt: typeof o.updatedAt === "string" ? o.updatedAt : undefined,
    publishedAt: typeof o.publishedAt === "string" ? o.publishedAt : undefined,
  };
}

export async function fetchBlogs(): Promise<Blog[]> {
  const url = `${STRAPI_BASE_URL}/api/blogs?populate=*`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load list: HTTP ${res.status}`);
  }
  const json = (await res.json()) as BlogsListResponse;

  return (json.data ?? []).map(mapBlog);
}

export async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  const q = `filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  const url = `${STRAPI_BASE_URL}/api/blogs?${q}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load article: HTTP ${res.status}`);
  }
  const json = (await res.json()) as BlogsListResponse;
  const raw = json.data?.[0];
  return raw != null ? mapBlog(raw) : null;
}
