import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: `${post.title} | Alhamdulillah Blog`, description: post.excerpt ?? undefined };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <article className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <p className="text-sm text-zinc-500">{new Date(post.createdAt).toLocaleDateString()}</p>
          <h1 className="mt-1 text-3xl font-semibold">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-3 text-zinc-600">{post.excerpt}</p>
          )}
          <div className="prose mt-6 max-w-none text-zinc-800">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 leading-8">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
