import {
  fireEvent,
  waitFor,
  render,
  screen,
  act
} from "@testing-library/react";
// import {act} from 'react-dom/test-utils'


import "@testing-library/jest-dom";
import { supabase } from "../lib/supabaseClient";
import JobListings from "../components/JobListings";
import userEvent from "@testing-library/user-event";

jest.mock("../lib/supabaseClient", () => {
  const rangeMock = jest.fn();
  const selectMock = jest.fn(() => ({
    ilike: () => ({
      order: () => ({
        range: rangeMock,
      }),
    }),
  }));

  const fromMock = jest.fn().mockReturnValue({
    select: selectMock,
  });

  return {
    from: fromMock,
    supabase: {
      from: fromMock,
    },
    __mocks: {
      rangeMock,
      selectMock,
      fromMock,
    },
  };
});

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

it("renders the JobListings component", async() => {
 await act(async () => {
    render(<JobListings />);
  });
 
  expect(screen.getByText(/Job Listings/i)).toBeInTheDocument();

});

it("updates the search input value", async () => {
  await act(async() => {
    render(<JobListings />);
  });

  const searchInput = screen.getByPlaceholderText(/Search jobs/i);
  act(() => {
    fireEvent.change(searchInput, { target: { value: "React Developer" } });
  });



  expect(searchInput).toHaveValue("React Developer");
});

it("selects a sort option", async() => {
  await act(async()=> {
    render(<JobListings />);
  })

const selectInput = screen.getByText("Sort").closest("select");
await act(async()=> {
  fireEvent.change(selectInput, { target: { value: "alphabetical" } });
})

expect(selectInput).toHaveValue("alphabetical");
});


