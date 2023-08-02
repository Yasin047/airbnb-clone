import { listingsData } from "./actions/getListings";
import { getCurrentUser } from "./actions/getUser";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

const Home = async ({ searchParams }) => {
  const currentUser = await getCurrentUser();
  const listings = await listingsData(searchParams);

  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {Array.isArray(listings)
          ? listings?.map((listing) => {
              return (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  currentUser={currentUser}
                />
              );
            })
          : []}
      </div>
    </Container>
  );
};

export default Home;
