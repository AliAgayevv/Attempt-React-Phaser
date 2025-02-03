import { useEffect, useState } from "react";

const useBreakpoint = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasTouchScreen =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.maxTouchPoints > 0;

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const hasKeyboard = window.matchMedia("(pointer: fine)").matches;

      setIsTouchDevice(hasTouchScreen && isMobile && !hasKeyboard);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isTouchDevice;
};

export default useBreakpoint;
