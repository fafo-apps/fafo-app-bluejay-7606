import { NextResponse, NextRequest } from "next/server";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const post = await getPostBySlug(slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}
