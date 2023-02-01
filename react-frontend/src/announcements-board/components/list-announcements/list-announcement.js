import "./list-announcement.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";

function ListAnnouncement({ selectedFilter }) {
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

  const announcementsList = announcements.map((announcement) => {
    return announcements.length > 0 ? (
      <div className="card mb-2" key={announcements.id}>
        <div className="card-body">
          <p className="card-text fw-bold">{announcement.content}</p>
          <p className="card-title text-end">
            Created On: {announcement.createdOn}
          </p>
          <a href="#" className="btn btn-primary">
            Delete
          </a>
        </div>
      </div>
    ) : null;
  });

  return (
    <>
      <h2>{selectedFilter}</h2>
      {announcementsList}
    </>
  );
}

export default ListAnnouncement;
