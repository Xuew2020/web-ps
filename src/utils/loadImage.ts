/**
 * 加载图像
 */

export default (
  url: string,
  crossOrigin: string = "anonymous"
): Promise<HTMLImageElement> => {
  const image = new Image();
  image.src = url;
  image.crossOrigin = crossOrigin;
  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (err) => {
      reject(err);
    };
  });
};
