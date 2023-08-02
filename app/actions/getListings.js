import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listingsData = async (params) => {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query = {};
    if (userId) {
      query.userId = userId;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }
    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }
    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                endDate: { gte: endDate },
                startDate: { lte: startDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error) {
    return error.message;
  }
};
