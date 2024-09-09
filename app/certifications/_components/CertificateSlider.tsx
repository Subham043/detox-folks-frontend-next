"use client";
import Image from "next/image";
import Slider from "react-slick";

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  autoplay: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const banners = [
  "/cert-1.webp",
  "/cert-2.webp",
  "/cert-3.webp",
  "/cert-4.webp",
];

export default function CertificateSlider() {
  return (
    <div className="w-full pt-5">
      <div className="container mx-auto">
        <Slider {...settings}>
          {banners.map((item, i) => (
            <picture key={i}>
              <source
                srcSet={item
                  .replace(".png", ".webp")
                  .replace("/cert", "/cert")}
                media="(max-width: 600px)"
              />
              <source srcSet={item} media="(max-width: 1920px)" />
              <source srcSet={item} />
              <Image
                src={item}
                alt={"Parcelcounter Certificate_" + (i + 1)}
                className="mx-auto object-contain p-1"
                width={1280}
                height={480}
                priority={i === 0}
              />
            </picture>
          ))}
        </Slider>
      </div>
    </div>
  );
}
