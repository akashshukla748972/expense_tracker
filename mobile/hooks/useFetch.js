import { useEffect, useState } from "react";
import { Axios } from "../services/Axios";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllWallet = async () => {
    try {
      const res = await Axios.get("/wallet/get-all-wallet");
      setData(res.data.data);
    } catch (error) {
      console.log("Error wallet->", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWallet();
  }, []);

  return { data, loading, error };
};

export default useFetch;
