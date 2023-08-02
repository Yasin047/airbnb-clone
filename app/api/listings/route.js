import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.error();
  }

  const body = await req.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue,
    price,
  } = body;
  if (
    !(title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue,
    price)
  ) {
    return NextResponse.error();
  }
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: locationValue.value,
      price: parseInt(price, 10),
      userId: session?.user?.id,
    },
  });
  return NextResponse.json(listing);
};

export const GET = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json(error.message);
  }
};
