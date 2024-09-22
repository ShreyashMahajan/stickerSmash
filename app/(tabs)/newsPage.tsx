import NewsSection from "@/components/NewsSection";
import NewsContext from "@/Context/newsContext";

const NewsPage = () => {
  return (
    <NewsContext>
      <NewsSection />
    </NewsContext>
  );
};

export {NewsPage};
