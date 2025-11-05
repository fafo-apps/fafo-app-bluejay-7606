import Link from "next/link";
import { listPublishedPosts } from "@/app/db/repositories/PostsRepository";

export const revalidate = 60; // refresh list periodically

export default async function Home() {
  const posts = await listPublishedPosts(20);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <p className="text-sm tracking-wide text-emerald-700">Bismillah</p>
          <h1 className="mt-2 text-3xl font-semibold">Praise be to Allah — The Most Merciful, The Most Generous</h1>
          <p className="mt-3 text-zinc-600">
            Reflections, reminders, and gratitude. May these words increase us in remembrance.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600">
            No posts yet. Start with “Alhamdulillah” — your first post will appear here.
          </div>
        ) : (
          <ul className="grid gap-6">
            {posts.map((post) => (
              <li key={post.id} className="group">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
                >
                  <h3 className="text-xl font-semibold group-hover:text-emerald-700">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-zinc-600">{post.excerpt}</p>
                  )}
                  <p className="mt-3 text-sm text-zinc-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="mx-auto max-w-3xl px-6 pb-12 text-center text-sm text-zinc-500">
        In shaa Allah — built with care.
      </footer>
    </div>
  );
}
