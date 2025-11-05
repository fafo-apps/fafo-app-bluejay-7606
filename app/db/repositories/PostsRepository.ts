import { pool } from "@/app/db/pool";

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  published: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

export async function listPublishedPosts(limit = 20): Promise<Post[]> {
  const { rows } = await pool.query(
    `SELECT 
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url as "coverImageUrl",
      published,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM posts
    WHERE published = TRUE
    ORDER BY created_at DESC
    LIMIT $1`,
    [limit]
  );
  return rows as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { rows } = await pool.query(
    `SELECT 
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url as "coverImageUrl",
      published,
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM posts
    WHERE slug = $1 AND published = TRUE
    LIMIT 1`,
    [slug]
  );
  return rows[0] ?? null;
}
