import React, { useEffect } from "react";

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
  const [filter, setFilter] = React.useState("Symbol(All)");

  useEffect(() => {
    console.log("Fetch data for all");
  }, []);

  function filterChangeHandler(event) {
    // update the selected filter
    setFilter(event.target.value);

    // instead if having he filter as a state, I will make the announcements data the state of this component
    // then we should update this list with new data whenever the filter has changed

    // Get the filter type
    const selectedFilter = event.target.value;

    // make an http request with the selectedFilter to fetch the data and update the announcements list state
  }

  function CreateAnnouncementHanlder(announcementContent) {
    console.log("handle announcement creation");
    console.log(announcementContent);
    // make a post http requests to save the new announcements and update the announcements list
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="container">
        <CreateAnnouncement onCreateAnnouncement={CreateAnnouncementHanlder} />

        {/* <!-- filter-labels --> */}
        <FilterControl onFilterChange={filterChangeHandler}></FilterControl>
        <ListAnnouncements selectedFilter={filter} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
