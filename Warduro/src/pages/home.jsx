import Slider from "/src/components/Slider";
import Intro from "/src/components/Intro";
import GetProducts from "../components/GetProducts";
import ScrollAnimation from "react-animate-on-scroll";
import CustomizeSection from "../components/CustomizeSection";
import ChooseSection from "../components/ChooseSection";
import ProductCollection from "../components/ProductCollection";
import GetMensHoodies from "../components/GetMensHoodies";
import GetWomensHoodies from "./GetWomensHoodies";

function Home() {
  const image1 =
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";
  const image2 =
    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp";
  const image3 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s";
  return (
    <>
      <Slider />
      <Intro />
      <GetProducts />
      <GetMensHoodies/>
      <GetWomensHoodies/>
      {/* <ProductCollection /> */}
      <CustomizeSection />
      <ChooseSection />
    </>
  );
}

export default Home;
