import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getListingById = async (params) => {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) return null;
    return listing;
  } catch (error) {
    return error.message;
  }
};
