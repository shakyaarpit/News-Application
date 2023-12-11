import { useState, useEffect } from "react";
import Card from "./Card";

const FetchData = ({ cat, page }) => {
  let category = cat;
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  if (
    userInfo &&
    userInfo.CategoryPreference &&
    userInfo.CategoryPreference.length > 0
  ) {
    category = userInfo.CategoryPreference[0];
  }
  console.log(category);
  const [data, setData] = useState([]);

  async function callApi() {
    let res = await fetch(
      cat
        ? `https://newsapi.org/v2/everything?q=${cat}&apiKey=235d8316ec254934b9b671f17c64517c&pageSize=30&page=${page}`
        : `https://newsapi.org/v2/everything?q=india&apiKey=be4e88d35dc045f6bce46fbb07c93cc3&pageSize=30&page=${page}`
    );
    let result = await res.json();
    setData(result.articles);
    console.log(result);
  }

  useEffect(() => {
    setData([]);
    callApi();
  }, [cat, page]);

  return (
    <div>
      {data && data.length > 0 ? (
        <Card data={data} />
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default FetchData;
