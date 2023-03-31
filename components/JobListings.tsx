import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "../components/InfiniteScroll";
import { supabase } from "../lib/supabaseClient";
import Job from "../interfaces/jobs";
import styles from "../pages/index.module.css";
import { useRouter } from "next/router";
import Button from "./ui/buttons/Button";
import Spinner from "./ui/spinner/Spinner";
import { toast } from "react-toastify";
import { useAppState } from "../context/AppStateContext";

//  fetches jobs from a Supabase database based on limit, offset, searchQuery, sortBy, and tagIds parameters.
const fetchJobs: any = async (
  limit, // Maximum number of jobs to be fetched at once
  offset, // Number of jobs already fetched
  searchQuery = "", // A search string used to filter jobs
  sortBy = "", // A string used to sort jobs
  tagIds = [] // An array of tag ids used to filter jobs
) => {
  const start = offset;
  const end = offset + limit - 1;

  try {
    let query = supabase.from("jobs").select("*");

    // Apply search filter
    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }
    // Apply sorting
    if (sortBy === "timestamp") {
      query = query.order("created_at", { ascending: false });
    } else if (sortBy === "alphabetical") {
      query = query.order("title", { ascending: true });
    }

    // Apply tag filter
    if (tagIds.length > 0) {
      const { data: jobTagData, error: jobTagError } = await supabase
        .from("job-tags")
        .select("job_id")
        .in("tag_id", tagIds);

      if (jobTagError) {
        console.error("Error fetching job tags:", jobTagError);
        return [];
      }

      const jobIds = jobTagData.map(item => item.job_id);
      query = query.in("id", jobIds);
    }

    // Apply limit and offset
    query = query.range(start, end);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching jobs:", error);
      throw error;
      // return [];
    }

    return data;
  } catch (error) {
    // throw(error)
  }
};

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { admin } = useAppState();
  const limit = 10;

  // This function loads jobs from the beginning of the list
  const loadJobs = async () => {
    setIsLoading(true);
    setOffset(0);
    try {
      const fetchedJobs: Job[] = await fetchJobs(
        limit,
        0,
        searchQuery,
        sortBy,
        selectedTags
      );
      console.log(fetchedJobs);
      if (fetchJobs.length > 0) {
        setJobs(fetchedJobs);
      }
    } catch (error) {
      // console.log(error, "error");
      if (error.response) {
        toast.error(error.message);
      } else {
        toast.error("Check internet connection");
      }
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  // This function loads more jobs when the user reaches the bottom of the list
  const loadMoreJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const newJobs = await fetchJobs(
        limit,
        offset,
        searchQuery,
        sortBy,
        selectedTags
      );
      // console.log(newJobs);
      setOffset(prevOffset => prevOffset + limit);
      if (newJobs.length === 0) {
        // scroll up
        window.scrollBy(0, -100);
      } else {
        setJobs(prevJobs => [...prevJobs, ...newJobs]);
      }
    } catch (error) {
      // console.log(error, "error");
      if (error.response) {
        toast.error(error.message);
      } else {
        toast.error("Check internet connection");
      }
    } finally {
      setIsLoading(false);
    }
  }, [offset, searchQuery, sortBy, selectedTags]);

  useEffect(() => {
    loadMoreJobs();
  }, []);

  // This effect fetches all available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data: tags } = await supabase.from("tags").select("*");
        if (tags) {
          setTags(tags);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchTags();
  }, []);

  // This function handles tag selection
  const handleTagSelection = (tagId: number) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <>
      <div style={{ minHeight: "100vh" }} className={`container mx-auto`}>
        <h1 className="text-4xl font-bold mb-8 text-center">Job Listings</h1>
        <div
          className={`flex flex-col md:flex-row items-center justify-center`}
        >
          <input
            type="text"
            placeholder="Search jobs"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none ml-4 mb-1 w-full"
          />

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 pl-5 pr-10 rounded-lg text-sm focus:outline-none ml-4 mb-1 w-full"
          >
            <option value="">Sort</option>
            <option value="timestamp">Sort by timestamp</option>
            <option value="alphabetical">Sort alphabetically</option>
          </select>
          <Button onClick={loadJobs} className="mb-1 ml-4 w-full">
            Load jobs
          </Button>
        </div>
        <div className="my-4">
          {/* Display all available tags */}
          {tags.map(tag => (
            <button
              key={tag.id}
              className={`px-4 py-2 rounded-full ${
                selectedTags.includes(tag.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleTagSelection(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
        {isLoading && <Spinner />} {/* Display spinner when fetching data */}
        {jobs.length === 0 && (
          <div className="bg-white p-4 mb-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            {" "}
            No results found{" "}
          </div>
        )}
        {/* Display all fetched jobs */}
        {jobs.map((job, index) => (
          <div
            onClick={() => {
              if (admin) {
                router.push(`/admin/jobs/${job.id}`);
              }
            }}
            key={index}
            className="bg-white p-4 mb-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-500 mb-2">{job.company}</p>
          </div>
        ))}
      </div>
      {/* Display infinite scroll */}
      <InfiniteScroll onLoadMore={loadMoreJobs} isLoading={isLoading} />
    </>
  );
};

export default JobListings;
