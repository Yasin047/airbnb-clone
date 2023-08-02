import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReservation = async (params) => {
  try {
    const { listingId, userId, authorId } = params;

    const query = {};
    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservations.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return reservations;
  } catch (error) {
    return error.message;
  }
};
