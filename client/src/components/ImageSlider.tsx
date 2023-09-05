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
      className="float-left mb-12 mr-8 h-[720px] w-[620px] select-none rounded-[20px] bg-black bg-opacity-5 shadow-cardShadow dark:bg-white dark:bg-opacity-5"
    >
      {images.map((image: string, i) => (
        <SwiperSlide key={i}>
          <img src={image} alt="review" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
