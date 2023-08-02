import { getFavoriteListings } from "../actions/getFavoriteListings";
import { getCurrentUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }
  return (
    <FavoritesClient
      favoriteListings={favoriteListings}
      currentUser={currentUser}
    />
  );
};

export default page;
