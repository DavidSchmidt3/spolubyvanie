import { type ReactNode, useEffect, useRef } from "react";
import { GUTTER_SIZE } from "./virtualized-list";

type Props = {
  children: ReactNode;
  onResize: (height: number) => void;
};

export default function MeasuredItem({ children, onResize }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const height = entry.contentBoxSize[0]?.blockSize ?? 0;
            onResize(height + GUTTER_SIZE);
          }
        }
      });

      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [onResize]);

  return <div ref={ref}>{children}</div>;
}
