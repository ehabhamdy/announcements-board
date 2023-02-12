import { useQuery } from "react-query";

import Request from "../api/Request";

const useInsights = (page) => {
  return useQuery(
    ["all-announcements", page],
    async () => {
      const { data } = await Request.get("/api/v1/announcements");
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export default useInsights;
