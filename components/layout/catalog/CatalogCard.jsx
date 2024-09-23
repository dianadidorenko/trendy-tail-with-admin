import CustomButton from "@/components/elements/Button";
import Link from "next/link";

const CatalogCard = ({ item }) => {
  const images = item.images.map((img) => img);

  return (
    <div className="flex flex-col text-center gap-2 py-4 px-10 rounded-lg catalogue-item border border-gray-100/80">
      <Link
        href={`/products/${item.urlName}`}
        key={item.id}
        className="relative"
      >
        <div className="image-container">
          <img
            src={images[0]}
            alt={item.name}
            className={`${
              images[1]
                ? "main-image"
                : "rounded-lg cursor-pointer transition-all duration-500 object-cover"
            } rounded-lg`}
          />
          {images[1] && (
            <img
              src={images[1]}
              alt={item.name}
              className={`${
                images[1]
                  ? "hover-image"
                  : "rounded-lg cursor-pointer object-cover"
              } rounded-lg`}
            />
          )}
        </div>
      </Link>

      <div className="flex flex-col items-center gap-2">
        <p className="uppercase font-bold text-[11px] sm:text-[13px] lg:text-[15px]">
          {item.brand}
        </p>
        <h3 className="text-[14px] sm:text-[17px] lg:text-[19px] text-center">
          {item.name}
        </h3>
        <p className="flex items-baseline gap-1 text-redColor">
          <span className="">від</span>
          <span className="font-bold text-[18px] sm:text-xl lg:text-2xl">
            {item.sizes[0].price}
          </span>
          <span className="font-semibold">₴</span>
        </p>
      </div>

      <div
        className={`flex gap-2 pt-0 sm:pt-2  ${
          item.categoryShow === "Ліжаки" && "flex flex-col gap-2"
        }`}
      >
        {item?.sizes?.length > 0 &&
          item.sizes.map((sizeObj) => (
            <div key={sizeObj._id}>
              <p className="text-[13px] sm:text-[15px] lg:text-[17px]">
                {sizeObj.size}
              </p>
            </div>
          ))}
      </div>

      <div className="relative pt-2">
        <Link href={`/products/${item.urlName}`}>
          <CustomButton
            text={"Перейти"}
            containerStyles={
              "w-[150px] h-[45px] text-[13px] lg:text-base xsSm:w-[100px] xs:w-[80px]"
            }
          />
        </Link>
      </div>
    </div>
  );
};

export default CatalogCard;
