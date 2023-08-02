import { listingsData } from "../actions/getListings";
import { getCurrentUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const listings = await listingsData({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }
  return (
    <div>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default page;
