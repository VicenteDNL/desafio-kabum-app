export const formatZipCodeToRequest = (value: string) => {
  return value.replace(/[^\d]/g, "");
};
