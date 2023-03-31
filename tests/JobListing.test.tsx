import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobListings from "../components/JobListings";
import { supabase } from "../lib/supabaseClient";

// ...

jest.mock("../lib/supabaseClient", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      range: jest.fn().mockResolvedValue({ data: [], error: null }),
      ilike: jest.fn().mockReturnThis(),
      in: jest.fn().mockReturnThis(),
    })),
  },
}));

// ...

describe("JobListings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the JobListings component", async () => {
    supabase.range.mockResolvedValue({ data: [], error: null });

    render(<JobListings />);

    expect(screen.getByText(/Job Listings/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/Load jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/Sort/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(supabase.range).toHaveBeenCalled();
    });
  });

  it('loads jobs and displays them when "Load jobs" button is clicked', async () => {
    const mockJobs = [
      {
        id: 1,
        title: "Job 1",
        company: "Company 1",
      },
      {
        id: 2,
        title: "Job 2",
        company: "Company 2",
      },
    ];
    supabase.range.mockResolvedValue({ data: mockJobs, error: null });

    render(<JobListings />);

    userEvent.click(screen.getByText(/Load jobs/i));

    await waitFor(() => {
      expect(screen.getByText(/Job 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Company 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Job 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Company 2/i)).toBeInTheDocument();
    });
  });

  it("displays an error message when there is an issue loading jobs", async () => {
    supabase.range.mockResolvedValue({
      data: null,
      error: new Error("Failed to load jobs"),
    });
    render(<JobListings />);

    userEvent.click(screen.getByText(/Load jobs/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/Check internet connection/i)
      ).toBeInTheDocument();
    });
  });

  it("updates the search input value", async () => {
    supabase.range.mockResolvedValue({ data: [], error: null });
    render(<JobListings />);

    const searchInput = screen.getByPlaceholderText(/Search jobs/i);

    fireEvent.change(searchInput, { target: { value: "Job Title" } });
    expect(searchInput).toHaveValue("Job Title");
  });

  it("selects a sort option", async () => {
    supabase.range.mockResolvedValue({ data: [], error: null });
    render(<JobListings />);

    const selectInput = screen.getByText(/Sort/i).closest("select");

    fireEvent.change(selectInput, { target: { value: "timestamp" } });
    expect(selectInput).toHaveValue("timestamp");
  });
});
