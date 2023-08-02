import { getReservation } from "../actions/getReservation";
import { getCurrentUser } from "../actions/getUser";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const page = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservation({ authorId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <div>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
};

export default page;
