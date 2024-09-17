export const formatCurrency = (
  price: number | string | undefined,
  currency: string = "USD"
) => {
  if (!price) return "";
  if (typeof price === "string") price = Number(price);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return formatter.format(price);
};
