import { NextResponse } from "next/server";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}
