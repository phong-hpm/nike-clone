import { FC, useCallback, useEffect, useRef, useState } from "react";

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

  // handle ratio when image is loading / loaded fail
  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl || !ratio) return;

    // add ratio
    containerEl.style.height = `${containerEl.offsetWidth / ratio}px`;
  }, [ratio]);

  return (
    <div ref={containerRef} className={mapClasses("w-full bg-neutral-100", containerClassName)}>
      {!!src && (
        <img
          className={className}
          srcSet={srcSet.join(",")}
          sizes={sizes}
          src={src}
          alt=""
          onLoad={(e) => {
            if (!containerRef.current) return;
            // remove ratio
            containerRef.current.style.height = "auto";
          }}
        />
      )}
    </div>
  );
};
