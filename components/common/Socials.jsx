"use client";

import Link from "next/link";
import { RiYoutubeFill, RiFacebookFill, RiInstagramFill } from "react-icons/ri";

const icons = [
  {
    path: "/",
    name: <RiYoutubeFill />,
  },

  {
    path: "/",
    name: <RiFacebookFill />,
  },
  {
    path: "/",
    name: <RiInstagramFill />,
  },
];
const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {icons.map((icon, index) => (
        <Link href={icon.path} key={index}>
          <div className={`${iconStyles}`}>{icon.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
