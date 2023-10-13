import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { cardId: string }}) {
  try {
    const { userId } = auth();
    const { cardId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const card = await db.card.update({
      where: {
        id: cardId,
        userId
      },
      data: {
        ...values,
      }
    });

    return NextResponse.json(card);
  } catch (error) {
    console.log("[card_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 

export async function DELETE(req: Request, { params }: { params: { cardId: string }}) {
  try {
    const { userId } = auth();
    const { cardId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card = await db.card.delete({
      where: {
        id: cardId,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.log("[card_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}