import FilterItem from "./FilterItem";

const filterOptions = [
  { name: "Today", value: "Today", checked: true },
  { name: "Last 7 days", value: "Week", check: false },
  { name: "Last Month", value: "Month", check: false },
  { name: "All", value: "All", check: false },
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
              <FilterItem
                key={option.name}
                option={option}
                onFilterChange={onFilterChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterControl;
