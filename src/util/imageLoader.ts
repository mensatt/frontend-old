type CustomLoaderParams = {
  src: string;
  width: number;
};

export const backendImageLoader = ({ src, width }: CustomLoaderParams) => {
  if (width) src += `&width=${width}`;
  return src;
};
