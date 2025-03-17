export const formatZipCode = (value: string) => {
  value = value.replace(/\D/g, "");
  if (value.length > 5) {
    value = value.substring(0, 5) + "-" + value.substring(5, 8);
  }

  return value;
};
