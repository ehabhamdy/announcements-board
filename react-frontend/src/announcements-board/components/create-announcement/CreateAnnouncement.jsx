import { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";

function CreateAnnouncement({ onCreateAnnouncement }) {
  const [isValid, setIsValid] = useState(true);
  const [enteredAnnouncement, setEnteredAnnouncement] = useState("");

  const announcementChangeHandler = (event) => {
    setEnteredAnnouncement(event.target.value);
    console.log("change");
    if (event.target.value.trim().length === 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredAnnouncement.trim().length === 0) {
      setIsValid(false);
      return;
    }
    // onCreateAnnouncement(enteredAnnouncement);
  };

  return (
    <form onSubmit={submitHandler}>
      <label
        htmlFor="announcementContent"
        className={`form-label fs-6 ${isValid ? "valid" : "noValid"}`}
        style={{ color: !isValid ? "red" : "black" }}
      >
        Announcement
      </label>
      <textarea
        // required
        name="contentInput"
        id="announcementContent"
        rows="3"
        placeholder="Please enter you announcement content ..."
        className="form-control"
        onChange={announcementChangeHandler}
        value={enteredAnnouncement}
        style={{ borderColor: !isValid ? "red" : "black" }}
      ></textarea>

      {!isValid ? (
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
