"use client";

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const SwiperNavButtons = ({
  btnStyles,
  iconStyles,
  containerStylesLeft,
  containerStylesRight,
}) => {
  const swiper = useSwiper();

  return (
    <>
      <div className={`${containerStylesLeft}`}>
        <button className={`${btnStyles}`} onClick={() => swiper.slidePrev()}>
          <PiCaretLeftBold className={`${iconStyles}`} />
        </button>
      </div>

      <div className={`${containerStylesRight}`}>
        <button className={`${btnStyles}`} onClick={() => swiper.slideNext()}>
          <PiCaretRightBold className={`${iconStyles}`} />
        </button>
      </div>
    </>
  );
};

export default SwiperNavButtons;
