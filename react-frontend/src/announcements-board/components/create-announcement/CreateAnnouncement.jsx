import { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";

function CreateAnnouncement({ onCreateAnnouncement }) {
  const [formErrors, setformErrors] = useState(false);
  const [enteredAnnouncement, setEnteredAnnouncement] = useState("");

  const announcementChangeHandler = (event) => {
    // setformErrors(true);
    setEnteredAnnouncement(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onCreateAnnouncement(enteredAnnouncement);
  };

  return (
    <form onSubmit={submitHandler}>
      <p htmlFor="announcementContent" className="form-label fs-6">
        Announcement
      </p>
      <textarea
        required
        name="contentInput"
        id="announcementContent"
        rows="3"
        placeholder="Please enter you announcement content ..."
        className="form-control"
        onChange={announcementChangeHandler}
        value={enteredAnnouncement}
      ></textarea>

      {formErrors ? (
        <p className="bd-highlight fs-7 text-danger">
          Please enter the announcement content before submitting the form
        </p>
      ) : null}

      <button type="submit" className="mt-3 btn btn-primary">
        Create Announcement
      </button>
    </form>
  );
}

export default CreateAnnouncement;
