import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useReducer, useState } from "react";
import useAnnouncementMutation from "../../services/useAnnouncementsMutation";

const announcementReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      content: action.val,
      isValid: action.val.trim().length > 10,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      content: state.content,
      isValid: state.content.trim().length > 10,
    };
  }

  return { content: "", isValid: false };
};

const initialAnnouncementState = { content: "", isValid: null };

function CreateAnnouncement({ filter }) {
  const [formIsValid, setFormIsValid] = useState(null);

  const mutation = useAnnouncementMutation(filter);

  const [announcementState, dispatchAnnouncements] = useReducer(
    announcementReducer,
    initialAnnouncementState
  );

  const { isValid: announcementContentIsValid } = announcementState;

  useEffect(() => {
    // input debounce
    const identifier = setTimeout(() => {
      setFormIsValid(announcementContentIsValid);
    }, 1000);

    return () => {
      clearTimeout(identifier);
    };
  }, [announcementContentIsValid]); // Only update form validity when the input validity changes

  const announcementChangeHandler = (event) => {
    dispatchAnnouncements({ type: "USER_INPUT", val: event.target.value });
  };

  const handleInputBlur = () => {
    dispatchAnnouncements({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Make a request to submit a new announcement
    // onCreateAnnouncement()
    mutation.mutate(announcementState);
  };

  return (
    <form onSubmit={submitHandler}>
      <label
        htmlFor="announcementContent"
        className={`form-label fs-6 ${
          formIsValid === false ? "noValid" : "valid"
        }`}
        style={{ color: formIsValid === false ? "red" : "black" }}
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
        onBlur={handleInputBlur}
        value={announcementState.value}
        style={{ borderColor: formIsValid === false ? "red" : "black" }}
      ></textarea>

      {formIsValid === false ? (
        <p className="bd-highlight fs-7 text-danger">
          Please enter the announcement content before submitting the form
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-3 btn btn-primary"
        disabled={!formIsValid}
      >
        Create Announcement
      </button>
    </form>
  );
}

export default CreateAnnouncement;
