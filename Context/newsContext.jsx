import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const NewsContext = createContext(null);

const Context = ({children}) => {
  const [news, setNews] = useState([]);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  const [mount, setMount] = useState("mounted");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setIsNewsLoading(true);
      const url =
        "https://finnhub.io/api/v1/news?category=general&token=crnva5pr01qt44diuov0crnva5pr01qt44diuovg";
      const result = await axios.get(url);
      setIsNewsLoading(false);
      setNews(result.data);
    } catch (error) {
      console.error(error);
      setNews([]);
      alert("Some error occured");
    }
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        isNewsLoading,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

const useNews = () => useContext(NewsContext);

export {useNews};

export default Context;
