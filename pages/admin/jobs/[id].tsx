import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import AdminLayout from "../../../components/layouts/AdminLayout";
import styles from "./Jobs.module.css";
import { type } from "../../../interfaces/index";
import Button from "../../../components/ui/Button";

const EditJob = () => {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      const { data: job } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      const { data: jobTags } = await supabase
        .from("job-tags")
        .select("tag_id")
        .eq("job_id", id);

      setTitle(job.title);
      setCompany(job.company);
      setSelectedTags(jobTags.map(jt => jt.tag_id));
      setJob(job);
    };

    const fetchTags = async () => {
      const { data: tags } = await supabase.from("tags").select("*");
      setTags(tags);
    };

    if (id) {
      fetchJob();
      fetchTags();
    }
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/jobs/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, company, tags: selectedTags }),
    });

    if (response.ok) {
      router.push("/admin/jobs");
    } else {
      const { message } = await response.json();
      alert(`Error: ${message}`);
    }
  };

  const handleTagSelection = value => {
    const index = selectedTags.indexOf(value);

    console.log(value, index);

    if (index === -1) {
      setSelectedTags([...selectedTags, value]);
    } else {
      console.log("remove");
      let tags = [...selectedTags];
      tags.splice(index, 1);
      setSelectedTags(tags);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="flex justify-center">
        <div
          className={`${styles.content} bg-white  rounded-md px-4 py-6`}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Edit Job</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="mt-1 block w-full shadow-md sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Company
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="mt-1 block w-full shadow-md sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Tags
              </label>
              <div className="relative shadow-md">
                <select
                  id="tags"
                  multiple
                  value={selectedTags}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                >
                  {tags.map(tag => (
                    <option
                      onClick={() => handleTagSelection(tag.id)}
                      key={tag.id}
                      value={tag.id}
                      className={`py-2 px-3 ${
                        selectedTags.includes(tag.id)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {tag.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 9l3 3 3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-6 mr-auto">
              <Button type="submit" style={{ width: "100%" }}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditJob;
