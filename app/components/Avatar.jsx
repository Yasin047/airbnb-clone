"use client";

import Image from "next/image";

const Avatar = ({ src }) => {
  return (
    <div>
      <Image
        className='rounded-full height="30'
        width="30"
        height="30"
        alt="Avatar"
        src={src || "/images/placeholder.jpg"}
      />
    </div>
  );
};

export default Avatar;
