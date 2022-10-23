import { FC, useCallback, useEffect, useRef, useState } from "react";

// components
import { AutoHeight } from "./AutoHeight";

const qualityList = [144, 440, 640, 864, 1280, 1536, 1920];

export interface ImageCustomProps {
  src?: string;
  className?: string;
  containerClassName?: string;
  /**
   * width / height
   */
  ratio?: number;
  /**
   * number per view witdh
   * Ex: 33vw, 50vw
   * Default: 100vw
   */
  sizes?: string;
}

export const ImageCustom: FC<ImageCustomProps> = ({
  src: srcProp = "",
  ratio,
  className,
  containerClassName,
  sizes = "100vw",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [src, setSrc] = useState<string>();
  const [srcSet, setSrcSet] = useState<string[]>([]);

  // handle mapping hight quality link
  const updateSrc = useCallback(() => {
    if (!srcProp) return;

    const paths = srcProp.split("/") || [];
    const id = paths[paths.length - 2] || "";
    const imgName = paths[paths.length - 1] || "";

    setSrcSet(qualityList.map((quality) => `${mapImageSrc(id, imgName, quality)} ${quality}w`));
    setSrc(mapImageSrc(id, imgName, qualityList[0]));
  }, [srcProp]);

  // lazy load
  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && updateSrc(),
      { rootMargin: "200px" }
    );

    observer.observe(containerEl);
    return () => observer.unobserve(containerEl);
  }, [srcProp, updateSrc]);

  const renderImage = () => {
    return (
      <div ref={containerRef} className={cls("w-full h-full bg-gray-middle", containerClassName)}>
        {!!src && (
          <img className={className} srcSet={srcSet.join(",")} sizes={sizes} src={src} alt="" />
        )}
      </div>
    );
  };

  if (!ratio) return renderImage();

  return <AutoHeight ratio={ratio}>{renderImage()}</AutoHeight>;
};
