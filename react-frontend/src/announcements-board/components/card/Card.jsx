function Card(props) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <p className="card-text fw-bold">{props.announcement.content}</p>
        <p className="card-title text-end">
          Created On: {props.announcement.createdOn}
        </p>
        <a href="#" className="btn btn-primary">
          Delete
        </a>
      </div>
    </div>
  );
}

export default Card;
