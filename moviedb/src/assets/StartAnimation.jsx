import { useLottie } from "lottie-react";
import LogoAnimation from "../assets/StartAnimtion.json";

const StartAnimation = () => {
  const lottie = {
    animationData: LogoAnimation,
    loop: false,
  };

  const { View } = useLottie(lottie);

  return (
    <section>
      <div>{View}</div>
    </section>
  );
};

export default StartAnimation;
