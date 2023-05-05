import React from "react";
import { Gif } from "@giphy/react-components";
import { IGif } from "@giphy/js-types";

interface Props {
  gif: IGif;
}

export const GIFContainer: React.FC<Props> = ({ gif }) => {
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
    <div ref={containerRef} style={{ marginBottom: 20 }}>
      <Gif gif={gif} width={containerSize} />
    </div>
  );
};
