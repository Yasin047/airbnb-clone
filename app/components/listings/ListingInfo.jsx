"use client";

import useCountries from "@/app/hooks/useCountries";
import dynamic from "next/dynamic";
import Avatar from "../Avatar";
import ListtingCategory from "./ListtingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValues,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValues)?.latlng;
  return (
    <div className=" col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListtingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
