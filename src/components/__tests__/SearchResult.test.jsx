import { fireEvent, render, waitFor } from "@testing-library/react";
import store from "../../utils/store";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { SEACH_BY_CATEGORY } from "../mocks/data";
import Search from "../Search";
import SearchResult from "../SearchResult";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(SEACH_BY_CATEGORY);
    },
  });
});

test('On clicking the search input Search Result page should load', async () => {
  const search = render(
    <StaticRouter>
      <Provider store={store}>
        <Search />
        <SearchResult />
      </Provider>
    </StaticRouter>
  );

  // Wait for the search input to render
  await waitFor(() => expect(search.getByTestId('search-input')));

  // Fire the change event on the search input
  const input = search.getByTestId('search-input');
  fireEvent.change(input, {
    target: {
      value: "React Js",
    },
  });

  // Wait for the search results to render
  await waitFor(() => expect(search.getAllByTestId('search-results')));

  // Verify that the search results are present
  const results = search.getAllByTestId('search-results');
  expect(results).toHaveLength(50);
});
