import { useEffect, useState } from "react";
import { Axios } from "../services/Axios";

const useFetchTransaction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllWallet = async () => {
    try {
      const res = await Axios.get("/transactions/get-transaction");
      setData(res.data.data);
    } catch (error) {
      console.log("Getting error while get all transactions: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWallet();
  }, []);

  return { data, loading, error };
};

export default useFetchTransaction;
