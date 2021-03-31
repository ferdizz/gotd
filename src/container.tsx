import React from "react";
import { Giphy } from "./giphy";

export const GIFContainer: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState(100);

  const handleResize = React.useCallback(() => {
    const width = containerRef.current?.offsetWidth;
    width && setContainerSize(width);
  }, [containerRef]);

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div ref={containerRef} style={{ height: "50vh" }}>
      <Giphy size={containerSize} />
    </div>
  );
};
