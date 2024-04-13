import { useState, useEffect } from "react";
const API_KEY = "394209c87d83ce7740ea5d4b9846f3d7";

// custom hook dùng để lấy data movies cho các component
export function useFetchData(url) {
  const [fetchData, setFetchData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3${url}api_key=${API_KEY}`
        );

        // tạo lỗi res.ok thường sẽ false nếu url không đúng
        if (!res.ok) throw new Error("Failed to fetching data. wrong Url!");

        const data = await res.json();
        const results = data.results;

        // tạo lỗi khi kết quả rỗng để thông báo lên UI
        if (results.length === 0)
          throw new Error(
            "Failed to search movie. You must be granted a valid key."
          );

        setFetchData(results);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();

    // clear error
    return () => {
      setError(null);
    };
  }, [url]);
  return {
    fetchData,
    error,
    setError,
  };
}
