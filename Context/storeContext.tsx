import {SearchableStock} from "@/Modals/stockTypes";
import {createContext, useContext, useState} from "react";

export const StoreContext = createContext<{
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchedStocks: SearchableStock[];
  setSearchedStocks: React.Dispatch<React.SetStateAction<SearchableStock[]>>;
  likedStocks: string[];
  updateLikedStocks: (ticker: string, op: "add" | "del") => void;
}>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchedStocks: [],
  setSearchedStocks: () => {},
  likedStocks: [],
  updateLikedStocks: () => {},
});

// const StoreProvider = ({children}: any) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchedStocks, setSearchedStocks] = useState<SearchableStock[]>([]);

//   return (
//     <StoreContext.Provider
//       value={{
//         searchQuery,
//         setSearchQuery,
//         searchedStocks,
//         setSearchedStocks,
//       }}
//     >
//       {children}
//     </StoreContext.Provider>
//   );
// };

const useStore = () => useContext(StoreContext);

export {useStore};
