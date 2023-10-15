import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { io } from "socket.io-client";

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

    const socket = io("http://localhost:3001");
    socket.emit("card:update", card);

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

    const socket = io("http://localhost:3001");
    socket.emit("card:delete", card.id);

    return NextResponse.json(card);
  } catch (error) {
    console.log("[card_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}