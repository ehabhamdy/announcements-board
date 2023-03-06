import React from "react";

import "./App.css";
import CreateAnnouncement from "./announcements-board/components/create-announcement/CreateAnnouncement";
import ListAnnouncements from "./announcements-board/components/list-announcements/ListAnnouncements";
import FilterControl from "./announcements-board/components/filter/FilterControl";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60, // 5 minutes
      cacheTime: Infinity, // do not delete stale data
    },
  },
});

function App() {
  const [filter, setFilter] = React.useState("All");

  function filterChangeHandler(event) {
    // update the selected filter
    setFilter(event.target.value);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="container">
        <CreateAnnouncement filter={filter} />

        {/* <!-- filter-labels --> */}
        <FilterControl onFilterChange={filterChangeHandler}></FilterControl>
        <ListAnnouncements selectedFilter={filter} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
