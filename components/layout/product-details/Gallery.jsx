"use client";

import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

const Gallery = ({ productMedia, itemName }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col xs:items-center">
      <div className="flex flex-col gap-3 xs:max-w-[250px] xsSm:max-w-[300px] sm:max-w-[410px]">
        <Image
          src={mainImage}
          width={410}
          height={500}
          objectFit="cover"
          alt={`${itemName}`}
          className="max-w-[500px] xs:w-[250px] xsSm:w-[300px] sm:w-[410px] rounded-lg shadow-xl object-cover border border-gray-400/20"
        />
        <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
          {productMedia.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={130}
              height={130}
              objectFit="cover"
              alt={`${itemName}`}
              className={`xs:w-[77px] xsSm:w-[95px] sm:w-[130px] rounded-lg object-cover cursor-pointer ${
                mainImage === image ? "border-2 border-primary/40" : ""
              }`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>

      {productMedia.length > 3 && (
        <div className="flex items-end justify-end">
          <DoubleArrowRightIcon className="w-[35px] h-[35px] animate-swipe repeat-infinite border rounded-full border-gray-200 mt-1 py-2" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
