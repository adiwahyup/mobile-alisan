export const discount = (price, discount) => {
  const total = (price * discount) / 100;
  const fix = price - total;
  return fix;
};
