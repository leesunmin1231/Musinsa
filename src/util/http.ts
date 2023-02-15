export const httpGet = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};
