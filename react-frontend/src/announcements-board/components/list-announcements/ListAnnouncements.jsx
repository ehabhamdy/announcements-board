import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Card from "../card/Card";
import useAnnouncementsQuery from "../../services/useAnnouncementsQuery";

function ListAnnouncements({ selectedFilter }) {
  const { data, isLoading } = useAnnouncementsQuery(selectedFilter);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h2>{selectedFilter}</h2>
      {/* {announcementsList} */}
      {data.announcements.length === 0 ? (
        <h2>No announcements to be displayed</h2>
      ) : (
        data.announcements.map((announcement) => {
          return <Card key={announcement.id} announcement={announcement} />;
        })
      )}
    </>
  );
}

export default ListAnnouncements;
