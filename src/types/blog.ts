export interface Blog {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  image?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
export interface BlogsListResponse {
  data: Blog[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
