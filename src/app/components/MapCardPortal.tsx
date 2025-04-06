// components/MapCardPortal.tsx
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface MapCardPortalProps {
  markerId: string;
  children: React.ReactNode;
}

export default function MapCardPortal({ markerId, children }: MapCardPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(markerId);
    if (el) {
      setContainer(el);
    }
  }, [markerId]);

  return container ? ReactDOM.createPortal(children, container) : null;
}
