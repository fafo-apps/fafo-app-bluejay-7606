import { NextResponse } from "next/server";
import { listPublishedPosts } from "@/app/db/repositories/PostsRepository";

export async function GET() {
  try {
    const posts = await listPublishedPosts(50);
    return NextResponse.json({ posts });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}
