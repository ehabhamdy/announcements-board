import { useMutation, useQueryClient } from "react-query";

import Request from "../api/Request";

const useAnnouncementMutation = (filter) => {
  const queryClient = useQueryClient();

  return useMutation(
    (newAnnouncement) => {
      return Request.post("/api/v1/announcements", newAnnouncement);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData(
          ["all-announcements", filter],
          (oldQueryData) => {
            return {
              message: response.data.message,
              announcements: [
                response.data.announcement,
                ...oldQueryData.announcements,
              ],
            };
          }
        );
      },
    }
  );
};

export default useAnnouncementMutation;
