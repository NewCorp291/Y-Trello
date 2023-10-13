import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title, state } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const card = await db.card.create({
      data: {
        userId,
        title,
        state
      }
    });

    return NextResponse.json(card);
  } catch (error) {
    console.log("[BOARD]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}
