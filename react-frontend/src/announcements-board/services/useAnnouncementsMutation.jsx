import { useMutation, useQueryClient } from "react-query";

import Request from "../api/Request";

const useAnnouncementMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newAnnouncement) => {
      return Request.post("/api/v1/announcements", newAnnouncement);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData(["all-announcements", 0], (oldQueryData) => {
          return {
            message: oldQueryData.message,
            announcements: [
              response.data.announcement,
              ...oldQueryData.announcements,
            ],
          };
        });
      },
    }
  );
};

export default useAnnouncementMutation;
