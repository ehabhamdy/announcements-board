export const FilterType = {
  All: Symbol("All"),
  Week: Symbol("Week"),
  Month: Symbol("Month"),
  Today: Symbol("Today"),
};

const filterOptions = [
  { name: "Today", value: FilterType.Today, checked: true },
  { name: "Last 7 days", value: FilterType.Week, check: false },
  { name: "Last Month", value: FilterType.Month, check: false },
  { name: "All", value: FilterType.All, check: false },
];

function FilterControl({ onFilterChange }) {
  return (
    <div className="d-flex bd-highlight align-items-center justify-content-end">
      <div className="p-2 bd-highlight fs-6">View: </div>
      <div className="pt-2 pb-2 p-l-2 bd-highlight">
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          {filterOptions.map((option) => {
            return (
              <>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id={"btnradio" + option.value.toString()}
                  value={option.value.toString()}
                  // checked={true}
                  onClick={onFilterChange}
                  key={filterOptions.name}
                  readOnly
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor={"btnradio" + option.value.toString()}
                >
                  {option.name}
                </label>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterControl;
