import { useQuery } from "react-query";

import Request from "../api/Request";

const useAnnouncementQuery = (filter) => {
  return useQuery(
    ["all-announcements", filter],
    async () => {
      const { data } = await Request.get(`/api/v1/announcements/${filter}`);
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export default useAnnouncementQuery;
