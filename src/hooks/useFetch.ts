import { useEffect, useState } from "react";
import { Users } from "../@types/App";
import paginator from "../utils/paginator";

const api = "https://random-data-api.com/api/v2/users?size=100";

function useFetch() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Users[] | []>([]);

  const getUsers = async () => {
    const response = await fetch(api);
    const data = await response.json();
    setData(paginator(data));
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { loading, data };
}

export { useFetch };
