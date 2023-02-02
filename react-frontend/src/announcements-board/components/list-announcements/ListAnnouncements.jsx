import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Card from "../card/Card";

function ListAnnouncements({ selectedFilter }) {
  console.log(selectedFilter);

  const announcements = [
    {
      id: 1,
      content: "First announcemen",
      createdOn: "16-Jan-2023",
    },
    {
      id: 2,
      content: "Second announcement",
      createdOn: "16-Jan-2023",
    },
  ];

  // let announcementsList = announcements.length === 0 && (
  //   <h2>No announcements to be displayed</h2>
  // );

  // announcementsList =
  //   announcements.length > 0 &&
  //   announcements.map((announcement) => {
  //     return <Card key={announcement.id} announcement />;
  //   });

  return (
    <>
      <h2>{selectedFilter}</h2>
      {/* {announcementsList} */}
      {announcements.length === 0 ? (
        <h2>No announcements to be displayed</h2>
      ) : (
        announcements.map((announcement) => {
          return <Card key={announcement.id} announcement />;
        })
      )}
    </>
  );
}

export default ListAnnouncements;
