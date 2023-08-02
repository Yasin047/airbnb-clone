import { getReservation } from "../actions/getReservation";
import { getCurrentUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservation({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }
  return (
    <div>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default page;
