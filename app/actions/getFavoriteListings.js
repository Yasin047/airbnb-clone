import { getCurrentUser } from "./getUser";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...currentUser.favoritesIDs],
        },
      },
    });
    return favorites;
  } catch (error) {
    return error.message;
  }
};
