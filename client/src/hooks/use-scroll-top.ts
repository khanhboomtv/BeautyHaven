import { useEffect } from "react";
import { useLocation } from "wouter";

export function useScrollTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}
