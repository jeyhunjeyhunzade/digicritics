import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "swiper/css";

const ImageSlider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="select-none rounded-[20px] bg-black bg-opacity-5 shadow-cardShadow dark:bg-white dark:bg-opacity-5 sm:mb-4 sm:h-[620px] sm:w-[420px] md:h-[720px] md:w-[620px] xl:float-left xl:mb-12 xl:mr-8"
    >
      {images.map((image: string, i) => (
        <SwiperSlide key={i}>
          <img
            src={image}
            alt="review"
            className="sm:h-[620px] sm:w-[420px] md:h-[720px] md:w-[620px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
