export const formatDateToRequest = (data: string) => {
  const [dia, mes, ano] = data.split("/");
  return `${ano}-${mes}-${dia}`;
};
