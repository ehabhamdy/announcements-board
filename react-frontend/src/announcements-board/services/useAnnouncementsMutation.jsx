import { useMutation, useQueryClient } from "react-query";

import Request from "../api/Request";

const useAnnouncementMutation = (filter) => {
  // console.log(filter);
  const queryClient = useQueryClient();

  return useMutation(
    (newAnnouncement) => {
      return Request.post("/api/v1/announcements", newAnnouncement);
    },
    {
      onSuccess: (response) => {
        // Find better way to update the cached queries than invalidating the cache
        queryClient.invalidateQueries("all-announcements");

        // queryClient.setQueryData(
        //   ["all-announcements", filter],
        //   (oldQueryData) => {
        //     return {
        //       message: response.data.message,
        //       announcements: [
        //         response.data.announcement,
        //         ...oldQueryData.announcements,
        //       ],
        //     };
        //   }
        // );
      },
    }
  );
};

export default useAnnouncementMutation;
