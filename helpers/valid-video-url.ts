export const isValidVideoURL = (url: string) => {
  const pattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be|tiktok\.com)\/.+$/;
  return pattern.test(url);
};
