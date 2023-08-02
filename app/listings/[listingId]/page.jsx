import { getListingById } from "@/app/actions/getListingById";
import { getReservation } from "@/app/actions/getReservation";
import { getCurrentUser } from "@/app/actions/getUser";
import EmptyState from "@/app/components/EmptyState";
import ListtingClient from "./ListtingClient";

const page = async ({ params }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);
  const reservations = await getReservation(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListtingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default page;
