export const isValidImageURL = (url: string): boolean => {
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|tif)$/i;
  const isValid = imageExtensions.test(url);

  try {
    new URL(url);
  } catch {
    return false;
  }

  return isValid;
};
