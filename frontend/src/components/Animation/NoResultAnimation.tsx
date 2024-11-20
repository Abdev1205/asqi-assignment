import Lottie from "lottie-react";
import { noResultAnimation } from "@/assets/assetManger";

const NoResultAnimation = () => {
  return (
    <>
      <Lottie animationData={noResultAnimation} autoplay={true} loop={true} />
    </>
  );
};

export default NoResultAnimation;
