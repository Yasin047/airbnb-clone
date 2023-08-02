import { getCurrentUser } from "@/app/actions/getUser";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req, { params }) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId) {
      throw new Error("Invalid ID");
    }

    let favoritesIDs = [...currentUser?.favoritesIDs];
    favoritesIDs.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        favoritesIDs,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error.message);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId) {
      throw new Error("Invalid ID");
    }

    let favoritesIDs = [...(currentUser?.favoritesIDs || [])];
    favoritesIDs = favoritesIDs.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        favoritesIDs,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error.message);
  }
};
