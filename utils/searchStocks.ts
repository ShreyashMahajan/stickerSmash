import {stocks, stockPrices} from "@/data";
import {SearchableStock} from "@/Modals/stockTypes";

export const searchStocks = (text: string) => {
  if (!text) return [];

  return stocks.filter(
    (item) =>
      item.ticker.match(new RegExp(text, "i")) ||
      item.companyName.match(new RegExp(text, "i"))
  );
};

export const selectStock = (text: string) => {
  const stock = stocks.filter((i) => i.ticker === text);
  if (stock) return stock[0];
  return null;
};

export const selectStockPrice = (text: string) => {
  const stock = stockPrices.filter((i) => i.ticker === text);
  if (stock) return stock[0].prices;
  return [];
};
