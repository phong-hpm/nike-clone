import { FC, useContext, useMemo } from "react";

// components
import { ImageCustom } from "@root/components/commons";

// modules
import { ProductDetailContext } from "./ProductDetailProvider";

const ProductMoreInfo = () => {
  const { detailNodeList } = useContext(ProductDetailContext);

  const validNodeList = useMemo(() => {
    return detailNodeList.filter((node) => {
      const { title, body, landscapeURL } = node.properties;
      return title || body || landscapeURL;
    });
  }, [detailNodeList]);

  return (
    <>
      {validNodeList.map((node) => {
        const { title, body, landscapeURL } = node.properties;

        return (
          <div key={node.id} className="mb-20">
            {!!title && <h3 className="text-center text-3xl font-medium mb-4">{title}</h3>}
            {!!body && (
              <div className="text-center text-xl" dangerouslySetInnerHTML={{ __html: body }} />
            )}

            {!!landscapeURL && <ImageCustom ratio={128 / 77} src={landscapeURL} />}
          </div>
        );
      })}
    </>
  );
};

export default ProductMoreInfo;
