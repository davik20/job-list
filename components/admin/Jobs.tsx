import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import { supabase } from "../../lib/supabaseClient";
import Job from "../../interfaces/jobs";
import styles from "../../pages/index.module.css";
import { useRouter } from 'next/router';
import AdminLayout from "../layouts/AdminLayout";

// Replace this with your actual API call to fetch jobs
async function fetchJobs(limit, offset, searchQuery = "", sortBy = "") {
  const start = offset;
  const end = offset + limit - 1;

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

  // Apply limit and offset
  query = query.range(start, end);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }

  return data;
}

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const limit = 10;

  const router = useRouter();

  const loadJobs = async () => {
    setOffset(prev => 0);
    const fetchedJobs = await fetchJobs(limit, 0, searchQuery, sortBy);
    setJobs(fetchedJobs);
  };

  const loadMoreJobs = useCallback(async () => {
    setIsLoading(true);
    const newJobs = await fetchJobs(limit, offset);
    setJobs(prevJobs => [...prevJobs, ...newJobs]);
    setOffset(prevOffset => prevOffset + limit);
    setIsLoading(false);
  }, [offset]);

  useEffect(() => {
    loadMoreJobs();
  }, []);

  return (
    <AdminLayout>
    <div className={` ${styles.container} container mx-auto p-4`}>
      <h1 className="text-4xl font-bold mb-8 text-center">All Jobs</h1>
      <div className={`${styles.header} flex justify-center`}>   <input
        type="text"
        placeholder="Search jobs"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      />
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="border-2 border-gray-300 bg-white h-10 pl-5 pr-10 rounded-lg text-sm focus:outline-none ml-4"
      >
        <option value="">Sort</option>
        <option value="timestamp">Sort by timestamp</option>
        <option value="alphabetical">Sort alphabetically</option>
      </select>
      <button
        onClick={loadJobs}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline"
      >
        Load jobs
      </button></div>
   
      {jobs.map((job, index) => (
        <>
          <div
             onClick={()=> router.push(`/admin/edit-jobs/${job.id}`)}
            key={job.id}
            className="bg-white p-4 mb-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-500 mb-2">{job.company}</p>
            {/* Add any other job-related information you want to display here */}
          </div>
        </>
      ))}
      <InfiniteScroll onLoadMore={loadMoreJobs} isLoading={isLoading} />
    </div>
    </AdminLayout>
  );
};

export default JobListings;
