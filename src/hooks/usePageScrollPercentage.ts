import { useState, useEffect } from "react";

/* This hook calcs the current scroll percent for various progress-bars
    Example: 
        const scrollPercent = usePageScrollPercentage();

        return <div style={{width: `${scrolllPercent}%`}}/>
*/
export const usePageScrollPercentage = () => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  const scrollHandler = () => {
    const percent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    setScrollPercent(percent);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return scrollPercent;
};
