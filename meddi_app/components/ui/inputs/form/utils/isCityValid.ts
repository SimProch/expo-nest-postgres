export const isCityValid = (city: string) => {
  if (!city) return false;

  const regex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

  return regex.test(city.toLowerCase());
};
