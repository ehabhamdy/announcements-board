function FilterItem(props) {
  return (
    <>
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id={"btnradio" + props.option.value.toString()}
        value={props.option.value.toString()}
        // checked={true}
        onClick={props.onFilterChange}
        readOnly
      />
      <label
        className="btn btn-outline-primary"
        htmlFor={"btnradio" + props.option.value.toString()}
      >
        {props.option.name}
      </label>
    </>
  );
}

export default FilterItem;
