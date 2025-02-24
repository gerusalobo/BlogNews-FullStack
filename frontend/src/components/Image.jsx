import { IKImage } from "imagekitio-react";

const Image = ({ src, className, w, h, alt }) => {
  const validSrc = src && src.trim() !== "" ? src : null;

  return validSrc ? (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={validSrc}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  ) : null; // Retorna `null` se não houver imagem válida
};

export default Image;