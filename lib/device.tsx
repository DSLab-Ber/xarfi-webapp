// hooks/useDeviceType.ts

import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function detectDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";

  const width = window.innerWidth;
  const ua = navigator.userAgent;

  // iPhone / iPod
  if (isIOS() && /iPhone|iPod/i.test(ua)) {
    return "mobile";
  }

  // iPad (sometimes pretends to be desktop)
  if (isIOS() && /iPad/i.test(ua)) {
    return "tablet";
  }

  // Generic screen-width rules
  if (width <= 767) return "mobile";
  if (width >= 768 && width <= 1024) return "tablet";

  return "desktop";
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(detectDeviceType);

  useEffect(() => {
    const handleResize = () => setDeviceType(detectDeviceType());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}
