import heroImg1 from "../../assets/hero1.webp";
import heroImg2 from "../../assets/hero2.webp";
import heroImg3 from "../../assets/hero4.webp";
import heroImg4 from "../../assets/hero3.webp";
import Slider from "react-slick";

const Hero = () => {
  const heroImages = [
    { id: 1, img: heroImg1 },
    { id: 2, img: heroImg2 },
    { id: 3, img: heroImg3 },
    { id: 4, img: heroImg4 },
  ];

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative w-full h-[90vh]">
      <div className="overflow-hidden h-[90vh]">
        <Slider {...settings}>
          {heroImages?.map((item, index) => {
            return (
              <img
                key={index}
                src={item.img}
                alt="headerImg"
                className="w-full h-[90vh] object-cover"
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
