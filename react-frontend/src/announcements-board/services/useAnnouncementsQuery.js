import { useQuery } from "react-query";

import Request from "../api/Request";

const useAnnouncementQuery = (page) => {
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

export default useAnnouncementQuery;
